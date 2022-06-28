/*--------------------------------------------------------------------------------------*/
/* Nombre: SP_DWHDES01_CARGAR_PAGOS_DIARIOS											*/
/* Autor: cvillena                                                                      */
/* Objetivo:  carga de PAGO por dia 						*/
/* Parámetros: tipo TRUNCATE                                                            */
/*--------------------------------------------------------------------------------------*/
-------ejemplo de ingreso de parametros:  [dbo].[SP_DWHDES01_CARGAVENTAS_SEMANAS]   
 --    EXEC [dbo].[SP_DWHDES01_CARGAVENTAS_SEMANAS] 
ALTER PROCEDURE [dbo].[SP_DWHDES01_CARGAR_PAGOS_DIARIOS] 
AS
BEGIN

DECLARE @idSucursal smallint
DECLARE @newPagos decimal(18,8)

set @idSucursal = 1 

while @idSucursal < 6 begin

set @newPagos = (select COUNT(idTicket) Pagos from ticketsNivelServicios
 where boton in ('PAGO CUOTA' , 'PAGO DE CUOTAS' , 'PAGO CUOTAS', 'CUOTAS') and  
 CONVERT(date, FechaEmitido) = CONVERT(date, GETDATE()-1) and idSucursal = @idSucursal)

  UPDATE TA_Pagos_Facturas_diarios SET PAGOS =  @newPagos  
  where Fecha = CONVERT(date, GETDATE()-1) and CodSucursal = @idSucursal

  set @idSucursal = @idSucursal + 1

  end

   truncate table TA_DatosTempPagosSem
 insert into TA_DatosTempPagosSem (Gestion, Mes, Semana, codSucursal, Sucursal, Pagos)
 (select  YEAR(GETDATE()-1) gestion, month(GETDATE()-1) Mes , (DATEPART(week,FechaEmitido)) Semana , 
 idSucursal  codSucursal , 
(case idSucursal when 1 then 'Brasil'
	     		 when 2 then 'Equipetrol'
	     		 when 3 then 'Pampa'
	     		 when 5 then 'Santos Dumont'
	     		 when 4 then 'Villa' END) AS Nombre_Sucursal, COUNT(idTicket) Pagos  from ticketsNivelServicios
 where boton in ('PAGO CUOTA' , 'PAGO DE CUOTAS' , 'PAGO CUOTAS', 'CUOTAS') and 
 year(FechaEmitido) = YEAR(GETDATE()-1) and month(FechaEmitido) = MONTH(GETDATE()-1) 
 and DAY(FechaEmitido) = WEEKDAY 1
  group by   (DATEPART(week,FechaEmitido)), idSucursal  )


truncate table TA_DatosTempPagosMes
 insert into TA_DatosTempPagosMes (Gestion, Mes, codSucursal, Sucursal, Pagos)
select  YEAR(GETDATE()-1) gestion, month(GETDATE()-1) Mes ,
 idSucursal  codSucursal , 
(case idSucursal when 1 then 'Brasil'
	     		 when 2 then 'Equipetrol'
	     		 when 3 then 'Pampa'
	     		 when 5 then 'Santos Dumont'
	     		 when 4 then 'Villa' END) AS Nombre_Sucursal, COUNT(idTicket) Pagos  from ticketsNivelServicios
 where boton in ('PAGO CUOTA' , 'PAGO DE CUOTAS' , 'PAGO CUOTAS', 'CUOTAS') and
 year(FechaEmitido) = YEAR(GETDATE()-1) and month(FechaEmitido) = MONTH(GETDATE()-1)  and day(FechaEmitido) <= day(GETDATE()-1) 
   group by     idSucursal  


 update TA_DatosTempPagosSem set semana=semana-1
 update TA_DatosTempFacturaSem set semana=semana-1

          
END


podriamos sacar con el weekday 
 'Brasil'

   select datename(weekday= 'LUNES',GETDATE()-7)




   select  YEAR(GETDATE()-1) gestion, month(GETDATE()-1) Mes , (DATEPART(week,FechaEmitido)) Semana , 
 idSucursal  codSucursal , 
(case idSucursal when 1 then 'Brasil'
	     		 when 2 then 'Equipetrol'
	     		 when 3 then 'Pampa'
	     		 when 5 then 'Santos Dumont'
	     		 when 4 then 'Villa' END) AS Nombre_Sucursal, COUNT(idTicket) Pagos  from ticketsNivelServicios
 where boton in ('PAGO CUOTA' , 'PAGO DE CUOTAS' , 'PAGO CUOTAS', 'CUOTAS') and 
 year(FechaEmitido) = YEAR(GETDATE()-1) and month(FechaEmitido) = MONTH(GETDATE()-1) 
 and DAY(FechaEmitido) = day(convert(date,'lunes'))
  group by   (DATEPART(week,FechaEmitido)), idSucursal  




select  YEAR(GETDATE()-1) gestion, month(GETDATE()-1) Mes , (DATEPART(week,FechaEmitido)) Semana , 
 idSucursal  codSucursal , 
(case idSucursal when 1 then 'Brasil'
	     		 when 2 then 'Equipetrol'
	     		 when 3 then 'Pampa'
	     		 when 5 then 'Santos Dumont'
	     		 when 4 then 'Villa' END) AS Nombre_Sucursal, COUNT(idTicket) Pagos  from ticketsNivelServicios
 where boton in ('PAGO CUOTA' , 'PAGO DE CUOTAS' , 'PAGO CUOTAS', 'CUOTAS') and 
 year(FechaEmitido) = YEAR(GETDATE()-1) and month(FechaEmitido) = MONTH(GETDATE()-1) 
 and DAY(FechaEmitido) = (   select datepart(weekday,-2))and 
  group by   (DATEPART(week,FechaEmitido)), idSucursal  



   (select  YEAR(GETDATE()-1) gestion, month(GETDATE()-1) Mes , (DATEPART(week,FechaEmitido)) Semana , 
 idSucursal  codSucursal , 
(case idSucursal when 1 then 'Brasil'
	     		 when 2 then 'Equipetrol'
	     		 when 3 then 'Pampa'
	     		 when 5 then 'Santos Dumont'
	     		 when 4 then 'Villa' END) AS Nombre_Sucursal, COUNT(idTicket) Pagos  from ticketsNivelServicios
 where boton in ('PAGO CUOTA' , 'PAGO DE CUOTAS' , 'PAGO CUOTAS', 'CUOTAS') and 
 year(FechaEmitido) = YEAR(GETDATE()-1) and month(FechaEmitido) = MONTH(GETDATE()-1) 
 and DAY(FechaEmitido) between datepart( weekday,1) and Day(GetDate()-1) 
  group by   (DATEPART(week,FechaEmitido)), idSucursal  )