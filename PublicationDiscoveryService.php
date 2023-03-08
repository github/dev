<?php
    /**
     * Created by PhpStorm.
     * User: Radd, Norrin
     * Date: 6/22/2022
     * Time: 7:57 AM
     */


    namespace lookon\lib\import;

    use DateInterval;
    use DatePeriod;
    use DateTime;
    use Exception;
    use PDO;
    use PDOException;
    use function array_chunk;
    use function array_diff;
    use function array_intersect;
    use function array_merge;
    use function array_unique;
    use function count;
    use function date;
    use function error_reporting;
    use function ignore_user_abort;
    use function implode;
    use function ini_set;
    use function set_time_limit;
    use function sizeof;
    use function strtotime;
    use function var_export;
    use const E_ALL;

    set_time_limit(0);
    ignore_user_abort(1);
    ini_set('max_execution_time', 0);
    ini_set('memory_limit','1000M');
    error_reporting(E_ALL);
    ini_set('default_socket_timeout',-1);
    ini_set('mysqlnd.net_read_timeout', -1);

    CONST COMPANY_ID_STAGING_TABLE = 'company_id_staging';

/**
     *  Class PublicationDiscoveryService
     *
     *  Provides public methods for importing data from API
     *
     */
    class PublicationDiscoveryService
    {
        /**
         * @var PDO
         */
        private $_db;

        /**
         * @var RestSDK
         */
        private $_RestSDK;

        /**
         * @var array|false
         */
        private $_staged_company_ids;

        /**
         * @var array
         */
        private $_new_company_ids = [];

        /**
         * @var string
         */
        private $_last_publication_search_date;

        /**
         * @var array
         */
        private $_updated_company_ids;

        /**
         * @param PDO $db
         */
        public function __construct( PDO $db )
        {
            $this->_db = $db;

            $stmt = $this->_db->query ( " SELECT company_uid FROM " . COMPANY_ID_STAGING_TABLE . " " );
            $this->_staged_company_ids = $stmt->fetchAll ( PDO::FETCH_COLUMN );

            $stmt = $this->_db->query ( " SELECT max(updated_at) FROM " . COMPANY_ID_STAGING_TABLE . " " );
            $this->_last_publication_search_date = $stmt->fetch ( PDO::FETCH_COLUMN );

            echo "\n\n_last_publication_search_date: ".$this->_last_publication_search_date."\n\n";

            //$this->_last_publication_search_date = "2022-11-18 21:54:19";

            $this->_RestSDK = new RestSDK();
        }

        /**
         * @return void
         * @throws Exception
         */
        public function discover()
        {
            //discover new publications to discover to company ids.
            while($this->_last_publication_search_date <= $this->getNowDate ()){
                echo "\n\nFetching publications for " . $this->_last_publication_search_date . "\n";
                $this->discoverTransformations ()
                    &&  $this->applyTransformations()
                ;
            }
        }

        /**
         * Function discoverPublicationTransformations
         *
         * Poll the API for publications since last sync then compare IDs to company and return true while setting
         * new_publication_ids
         *
         * @return bool
         * @throws Exception
         */
        private function discoverTransformations (): bool
        {
            $this->setApiUpdatedCompanyIdsFromDates();
            $result = count($this->_updated_company_ids??[]) !== 0;
            if($result)
                $this->filterNewCompanyIds();

            return  $result;
        }

        /**
         * @return void
         * @throws Exception
         */
        private function setApiUpdatedCompanyIdsFromDates(): void
        {
            echo "Last Sync Date:".$this->getLastSyncDate () ."\n";
            echo "Date Now:".$this->getNowDate () ."\n";

            $dates = $this->enumerateDateSpan(
                $this->getLastSyncDate(),
                $this->getNowDate ()
            );

            $this->setLastSyncDate();

            if(count($dates)){
                echo "\n\nDates:".$dates[0] ." to ".$dates[sizeof ($dates)-1] ."\n";
                echo "--------------------------------------------\n";
                //for dates between generate urls then use the sdk to retrieve
                $base_url='https://www.zefix.admin.ch/ZefixPublicREST/api/v1/sogc/bydate/';

                $date_urls = [];

                foreach ( $dates as $date )
                    $date_urls[] = $base_url . $date;

                //var_export($date_urls);

                $sogcId_publications_data = $this->_RestSDK->queryDates($date_urls);

                foreach($sogcId_publications_data as $sogcId_publication_day)
                    foreach($sogcId_publication_day as $sogcId_publication)
                        $this->_updated_company_ids[] = $sogcId_publication->companyShort->uid;
            }
            else{
                echo "Already up to date.";
            }
        }

        /**
         * @param array $ids
         * @return void
         */
        private function filterNewCompanyIds( )
        {
            $this->_new_company_ids = array_diff(array_unique($this->_updated_company_ids),$this->_staged_company_ids);
            $this->_staged_company_ids = array_merge ($this->_staged_company_ids,$this->_new_company_ids);

            echo  "Count New IDs:";
            echo count( $this->_new_company_ids );
            echo "\n\n";

            echo  "Count Updated IDs:";
            echo count( $this->_updated_company_ids );
            echo "\n\n";
        }

        /**
         * @param string $startDate
         * @param string $endDate
         * @return array
         * @throws Exception
         */
        private function enumerateDateSpan( string $startDate, string $endDate): array
        {
            $queryDates = [];

            $start = new DateTime($startDate);
            $end = new DateTime($endDate);

            $end->setTime(0,0,1);

            $interval = DateInterval::createFromDateString('1 day');
            $period = new DatePeriod($start, $interval, $end);

            foreach ($period as $dt) {
                $queryDates[] = $dt->format("Y-m-d");
            }

            return $queryDates;
        }

        /**
         * @return string
         */
        private function getNowDate(): string
        {
            return ( new DateTime() )->format("Y-m-d H:i:s");
        }

        /**
         * @return string
         */
        private function getLastSyncDate(): string
        {
            return  ( new DateTime($this->_last_publication_search_date) )->format("Y-m-d");
        }

        /**
         * @return void
         */
        private function setLastSyncDate(): void
        {
            $this->_last_publication_search_date = $this->getLastSyncDatePlus();
        }

        /**
         * @return string
         */
        private function getLastSyncDatePlus(): string
        {
            return date ( 'Y-m-d H:i:s', ( strtotime ( $this->getLastSyncDate() . "+100 day" ) ) );
        }

        /**
         * @throws Exception
         */
        private function applyTransformations():void
        {
            $this->insertCompanyIds ();
            $this->updateCompanyIds ();
        }

        /**
         * @return void
         */
        private function insertCompanyIds(): void
        {
            echo  "Inserting " .count( $this->_new_company_ids ) . " New IDs:";
            echo "\n\n";

            $batched_new_company_ids = array_chunk ($this->_new_company_ids,100);

            foreach($batched_new_company_ids as $batch_new_company_ids){
                foreach($batch_new_company_ids as $index=>$value)
                    $batch_new_company_ids[$index] = [$value,0,0];//set the company_imported value

                $placeholders=[];

                if(count( $batch_new_company_ids)>0 ){

                    for($i=0;$i<count($batch_new_company_ids);$i++){
                        $placeholders[] = "(?,?,?)";//:'company_uid,:company_imported,:company_updating''
                    }

                    $values_placeholder_sql = implode(',',$placeholders);
                    $sql = "Insert into ". COMPANY_ID_STAGING_TABLE . " (company_uid,company_imported,company_updating) values " . $values_placeholder_sql;
                    $stmt = $this->_db->prepare ($sql);

                    try{
                        $stmt->execute( array_merge(...$batch_new_company_ids) );
                    }catch(PDOException $exception){
                        echo "Line:".$exception->getLine ()."\n";
                        echo "Message:".$exception->getMessage ()."\n";
                    }
                }
            }

            echo  "Inserting " .count( $this->_new_company_ids ) . " IDs Complete";
            echo "\n\n";
        }

        /**
         * @return void
         */
        private function updateCompanyIds()
        {
            echo  "Updating " . count( $this->_updated_company_ids ) . " existing IDs.";
            echo "\n\n";

            $where_in_placeholder_string = implode(',', array_fill(1,count($this->_updated_company_ids),'?'));

            $sql = "UPDATE " . COMPANY_ID_STAGING_TABLE . " SET `company_updating`=1 WHERE company_uid in ( $where_in_placeholder_string )";
            $stmt = $this->_db->prepare ($sql);

            try{
                $stmt->execute( $this->_updated_company_ids );
                //echo $updated_company_id . ",";
            }catch(PDOException $exception){
                echo "Line:".$exception->getLine ()."\n";
                echo "Message:".$exception->getMessage ()."\n";
            }

            echo "\n\n";
            echo  "Updating " .count( $this->_updated_company_ids ) . " IDs Complete";
            echo "\n\n";
        }
    }
