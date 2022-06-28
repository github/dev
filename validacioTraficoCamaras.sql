USE [StageTableau]
GO
/****** Object:  StoredProcedure [dbo].[SP_DWHDES01_CARGAR_TRAFICO_CAMARAS]    Script Date: 28/06/2022 11:03:49 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*--------------------------------------------------------------------------------------*/
/* Nombre: SP_DWHDES01_CARGAVENTAS_SEMANAS												*/
/* Autor: cvillena                                                                      */
/* Objetivo:  carga de trafico por dia - por año,semana,dia 							*/
/* Parámetros: tipo TRUNCATE                                                            */
/*--------------------------------------------------------------------------------------*/
-------ejemplo de ingreso de parametros:  [dbo].[SP_DWHDES01_CARGAVENTAS_SEMANAS]   
 --    EXEC [dbo].[SP_DWHDES01_CARGAVENTAS_SEMANAS] 
ALTER PROCEDURE [dbo].[SP_DWHDES01_CARGAR_TRAFICO_CAMARAS] 
@año as smallint ,@mes as smallint, @semana as smallint, @DiaSemana as smallint , 
@DiaFecha as smallint, @idSucursal as smallint
--, @Contador as smallint
AS
BEGIN

--DECLARE @newDay smallint
DECLARE @newMonth smallint
DECLARE @newId smallint

DECLARE @newPagos decimal(18,8)
DECLARE @newFacturas decimal(18,8)
DECLARE @newPersonal decimal(18,8);
DECLARE @newTrafico decimal(18,8);
DECLARE @newConversion decimal(18,8);
DECLARE @newContador smallint

--set @DiaFecha = (select DAY(GETDATE()) - 1 )
set @newMonth = @mes --(select month(GETDATE()))
set @newId = (SELECT MAX(id)+1  FROM [StageTableau].[dbo].[TB_ContadorTraficoCamaras] )
set @newPagos = (select COUNT(idTicket) Pagos from ticketsNivelServicios
 where boton in ('PAGO CUOTA' , 'PAGO DE CUOTAS', 'PAGO CUOTAS', 'CUOTAS' )  and YEAR(FechaEmitido) = @año  and MONTH(FechaEmitido) = @newMonth 
 and day(FechaEmitido) = @DiaFecha and idSucursal = @idSucursal)

--(select  Pagos from [dbo].[TA_Pagos_Facturas_diarios] where year(Fecha) = @año 
--and month(Fecha) = @newMonth and day(Fecha)= @DiaFecha and CodSucursal = @idSucursal)

set @newFacturas = (select  Facturas from [dbo].[TA_Pagos_Facturas_diarios] where year(Fecha) = @año and month(Fecha) = @newMonth
and day(Fecha)= @DiaFecha and CodSucursal = @idSucursal)
SET @newPersonal =  0--(Select (Turnos*CantPersonas) as tc from [dbo].[SUCURSAL] where Id = @idSucursal )
SET @newContador =  (select sum(Contador) from TA_DatosContadorCamaraDiario where gestion = @año and mes = @mes and dia = @DiaFecha and Sucursal= @idSucursal )
SET @newTrafico = (@newContador - @newPagos ) 
SET @newConversion = (@newFacturas/@newTrafico)  

--DAY(GETDATE())-1
INSERT INTO [dbo].[TB_ContadorTraficoCamaras]
           ([Año],[Mes],[DiaFecha],[Semana],[DiaSemana],[idSucursal],[Contador],[id], [Trafico] , [Conversion])
     VALUES
           (@año, @mes, @DiaFecha, @semana, @DiaSemana, @idSucursal, @newContador, @newId, @newTrafico, @newConversion )
       
END
