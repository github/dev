<?php
    /**
     * Created by PhpStorm.
     * User: Radd, Norrin
     * Date: 6/22/2022
     * Time: 7:57 AM
     */

    namespace lookon\lib\import;

    use DateTime;
    use PDO;
    use PDOException;
    use function array_slice;
    use function count;
    use function error_reporting;
    use function ignore_user_abort;
    use function implode;
    use function in_array;
    use function ini_set;
    use function set_time_limit;
    use const E_ALL;

    set_time_limit(0);
    ignore_user_abort(1);
    ini_set('max_execution_time', 0);
    ini_set('memory_limit','1000M');
    error_reporting(E_ALL);
    ini_set('default_socket_timeout',-1);
    ini_set('mysqlnd.net_read_timeout', -1);

/**
     *  Class CompanyUpdateService
     *
     *  Provides public methods for importing data from API
     */
    class CompanyUpdateService
    {
        /**
         * @var string
         */
        private string $COMPANY_ID_STAGING_TABLE = 'company_id_staging';
        /**
         * @var string
         */
        private string $COMPANY_TABLE = 'companies';

        /**
         * @var PDO
         */
        private $_db;

        /**
         * @var RestSDK
         */
        private $_RestSDK;

        /**
         * @var array
         */
        private $_new_company_ids = [];

        /**
         * @var array
         */
        private $_update_company_ids = [];

        /**
         * @var CompanyModel[]
         */
        private $_import_companies = [];

        /**
         * @var array
         */
        private $_update_companies = [];

        /**
         * @var CompanyStore
         */
        private $_CompanyStore;

        /**
         * @var int[]
         * @description ids of entries that have been modified by customers
         */
        private $_desynced_ids;

        /**
         * @var array
         */
        private array $_imported_companies =[];

        /**
         * @var array
         */
        private array $_updated_companies =[];

        /**
         * @param PDO $db
         */
        public function __construct( PDO $db )
        {
            $this->_db = $db;
            $this->_RestSDK = new RestSDK();
            $this->_CompanyStore = new CompanyStore($this->_db);

             $this->setDesyncedIds();
        }

        /**
        * @return array
        */
        public function update(): void
        {
            $results=[];

            echo "Begin Update at ". ( new DateTime() )->format("Y-m-d H:i:s") . "\n";

            while( $this->loadCompanyChanges () ){
                $this->loadChangedCompaniesFromApi();
                $this->storeCompanyChanges();
            }

            echo "\n";
            echo "CompanyUpdateService completed at ". ( new DateTime() )->format("Y-m-d H:i:s") . "\n";
        }

        /**
         * @function loadCompanyChanges
         * get rows from company_id_staging where company_imported = 0 and company_updating = 1
         *
         * @return bool
         */
        private function loadCompanyChanges():bool
        {
            $sql ="UPDATE company_id_staging SET company_imported=1 WHERE company_imported=0 AND company_uid IN (SELECT uid FROM companies)";
            $this->_db->query($sql)->execute();



            $total_count = $this->loadCompanyInsertChanges() + $this->loadCompanyUpdateChanges();

            if( $total_count == 0 )
                echo "No IDs to process, exiting.\n\n";

            return $total_count != 0;
        }

        /**
         * @return int
         */
        private function loadCompanyInsertChanges():int
        {
            echo "\n\n------------------------\n\n";
            echo "Loading Company Insert Changes.";
            echo "\n\n------------------------\n\n";

            $sql_new_company_ids =
<<<EOF
SELECT company_uid
FROM $this->COMPANY_ID_STAGING_TABLE
WHERE company_imported = 0
EOF;

            echo "\n\n------------------------\n\n";
            echo "Querying tables with " . $sql_new_company_ids;
            echo "\n\n------------------------\n\n";

            $stmt_new_company_ids = $this->_db->query ( $sql_new_company_ids );

            $_new_company_ids = [];

            try{
                $_new_company_ids = $stmt_new_company_ids->fetchAll ( PDO::FETCH_COLUMN );
            }catch(PDOException $exception){
                echo "Line:".$exception->getLine ()."\n";
                echo "Message:".$exception->getMessage ()."\n";
            }

            echo  "Found " . count(  $_new_company_ids ) . " new IDs to process.";
            echo "\n\n";

            if(count($_new_company_ids))
                $this->_new_company_ids =  $_new_company_ids;
            else
                $this->_new_company_ids = [];

            return count($_new_company_ids);
        }

        /**
         * @return int
         */
        private function loadCompanyUpdateChanges():int
        {
            echo "\n\n------------------------\n\n";
            echo "Loading Company Update Changes.";
            echo "\n\n------------------------\n\n";

            $sql_update_company_ids =
<<<EOF
SELECT company_uid
FROM $this->COMPANY_ID_STAGING_TABLE
WHERE company_updating = 1
EOF;

            echo "\n\n------------------------\n\n";
            echo "Querying tables with " . $sql_update_company_ids;
            echo "\n\n------------------------\n\n";

            $stmt_update_company_ids = $this->_db->query ( $sql_update_company_ids );

            $_total_update_company_ids=0;
            $_update_company_ids = [];

            try{
                $_update_company_ids = $stmt_update_company_ids->fetchAll ( PDO::FETCH_COLUMN ); 

            }catch(PDOException $exception){
                echo "Line:".$exception->getLine ()."\n";
                echo "Message:".$exception->getMessage ()."\n";
            }

            $_total_update_company_ids = count($_update_company_ids);
            $_update_company_ids = array_slice($_update_company_ids, 0, 250);

            echo  "Found " . $_total_update_company_ids . " existing IDs to process. Processing up to 250.\n";
            echo "\n\n";

            if(count($_update_company_ids))
                $this->_update_company_ids =  $_update_company_ids;
            else
                $this->_update_company_ids =[];

            return count($_update_company_ids);
        }

        /**
         * Generate the urls to access the api company UID endoint to get data for companies discovered in publications.
         * @return void
         */
        private function loadChangedCompaniesFromApi(): void
        {

            $base_url='https://www.zefix.admin.ch/ZefixPublicREST/api/v1/company/uid/';
            $_new_company_id_urls = $_update_company_id_urls =[];


            echo "Generating ".count($this->_new_company_ids)." API Query URLs for new companies. \n\n";

            foreach(  $this->_new_company_ids  as $id )
                $_new_company_id_urls[$id]= $base_url . $id;

            $new_company_data= $this->_RestSDK->queryIds($_new_company_id_urls);

            echo count ( $new_company_data ) . " new company data entries returned from API. \n\n\n";

            $this->_import_companies=[];

            if( count($new_company_data) ) {

                echo "\n\n";
                echo "Count New Company Data Entries from API:".count ( $new_company_data );
                echo "\n\n";

                foreach ( $new_company_data as $id => $CompanyData ) {
                    $CompanyData = $CompanyData[ 0 ];
                    $CompanyData->desynced = false;
                    $this->_import_companies[ $id ] = new CompanyModel( $CompanyData );
                }
            }

            echo "Generating ".count($this->_update_company_ids)." API Query URLs for updated companies. \n\n";

            foreach(  $this->_update_company_ids  as $id )
                $_update_company_id_urls[$id]= $base_url . $id;

            $updated_company_data= $this->_RestSDK->queryIds($_update_company_id_urls);

            echo count ( $updated_company_data ) . " updated company data entries returned from API. \n\n";

            $this->_update_companies=[];

            foreach( $updated_company_data as $id=>$CompanyData){
                $CompanyData =  $CompanyData[0] ;

                $CompanyData->desynced = !in_array($CompanyData->uid, $this->_desynced_ids );

                $this->_update_companies[$id] = new CompanyModel( $CompanyData );
            }
        }

        /**
         * @return void
         */
        private function setDesyncedIds (): void
        {
            $sql = "SELECT uid from " . $this->COMPANY_TABLE . " where api_sync=0";
            $statement = $this->_db->prepare ($sql);

            $this->_desynced_ids = $statement->fetchColumn ()?:[];
        }

        /**
         * @return bool
         */
        private function storeCompanyChanges(): void
        {
            echo "\n\n";
            echo "Storing ".count($this->_import_companies)." Imported Companies From New IDs\n\n";

            if( count( $this->_import_companies ) ){
                foreach( $this->_import_companies as $new_company){
                    if( $company_id = $this->_CompanyStore->insertCompany( (array) $new_company ) ){
                        $this->_imported_companies[]=$new_company->uid;
                        $this->insertCompanyTabsRows($company_id);
                        $this->insertPaymentsRow($company_id);
                    }
                }

                $this->updateCompanyIdsStagingInsert ();
            }

            echo "Storing ".count($this->_update_companies)." Updated Companies From Existing IDs\n\n";
            echo "\n\n";

            if( count( $this->_update_companies ) )
                foreach( $this->_update_companies as $update_company)
                    if($this->_CompanyStore->updateCompany( (array)  $update_company ) ){
                        $this->_updated_companies[]=$update_company->uid;
                        $this->updateCompanyIdsStagingUpdate ();
                    }
        }

        /**
         * @param $company_id
         * @return bool
         */
        private function insertCompanyTabsRows( $company_id): bool
        {
            $sql = 'INSERT into company_tabs (company_id, show_interraction, show_jobs, show_gallery, show_review, show_contactform, show_pricelist, show_team, show_news, show_register)
                values
                ('. $company_id . ',0,0,0,1,0,0,0,0,1)'
                ;
            $stmt = $this->_db->prepare ($sql);
            $stmt->execute ();

            return true;
        }

        /**
         * @param $company_id
         * @return void
         */
        private function insertPaymentsRow( $company_id ): void
        {
            $sql = 'INSERT into payments ( company_id ) values ( '. $company_id . ' )' ;
            $stmt = $this->_db->prepare ($sql);
            $stmt->execute ();
        }

        /**
         * @return bool
         *
         * todo: update to use a single query
         */
        private function updateCompanyIdsStagingInsert(): bool
        {
            $update_sql = "UPDATE " . $this->COMPANY_ID_STAGING_TABLE . " SET `company_imported`=:company_imported WHERE company_uid = :company_uid";
            $update_statement = $this->_db->prepare ($update_sql);

            foreach($this->_imported_companies as $imported_company_uid) {
                $update_statement->execute([
                    'company_imported'=>1,
                    'company_uid'=>$imported_company_uid
                ]);
            }

            return true;
        }

        /**
         * @return bool
         *
         * todo: update to use a single query
         */
        private function updateCompanyIdsStagingUpdate(): bool
        {
            $update_sql = "UPDATE " . $this->COMPANY_ID_STAGING_TABLE . " SET `company_updating`=:company_updating WHERE company_uid = :company_uid";
            $update_statement = $this->_db->prepare ($update_sql);

            foreach($this->_updated_companies as $updated_company_id) {
                $update_statement->execute([
                    'company_updating'=>0,
                    'company_uid'=>$updated_company_id
                ]);
            }

            return true;
        }

        /**
         * @return void
         */
        private function syncyImportedCompanies():void
        {
            // remove artifacts
            $sql_clean_new_company_ids=
<<<EOF
update $this->COMPANY_ID_STAGING_TABLE set company_imported = 1
where $this->COMPANY_ID_STAGING_TABLE.company_uid in (select uid from $this->COMPANY_TABLE);
EOF;
            $this->_db->prepare ($sql_clean_new_company_ids)->execute();
        }

    }
