import logging

from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

try:
    from homeassistant.components.sensor import SensorEntity
except ImportError:
    from homeassistant.helpers.entity import Entity as SensorEntity

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    POWER_WATT,
    UnitOfTemperature,
    CONCENTRATION_PARTS_PER_MILLION,
    SIGNAL_STRENGTH_DECIBELS,
)

try:
    from homeassistant.components.sensor import (
        DEVICE_CLASS_HUMIDITY,
        DEVICE_CLASS_ILLUMINANCE,
        DEVICE_CLASS_TEMPERATURE,
        DEVICE_CLASS_CURRENT,
        DEVICE_CLASS_VOLTAGE,
        DEVICE_CLASS_POWER,
        STATE_CLASS_MEASUREMENT,
    )
except ImportError:
    DEVICE_CLASS_HUMIDITY = "humidity"
    DEVICE_CLASS_ILLUMINANCE = "illuminance"
    DEVICE_CLASS_TEMPERATURE = "temperature"
    DEVICE_CLASS_CURRENT = "current"
    DEVICE_CLASS_VOLTAGE = "voltage"
    DEVICE_CLASS_POWER = "power"
    STATE_CLASS_MEASUREMENT = "measurement"

try:
    from homeassistant.const import DEVICE_CLASS_CO2
except ImportError:
    DEVICE_CLASS_CO2 = "co2"

try:
    from homeassistant.const import PERCENTAGE
except ImportError:
    PERCENTAGE = "%"

try:
    from homeassistant.const import ELECTRIC_CURRENT_AMPERE
except ImportError:
    ELECTRIC_CURRENT_AMPERE = "A"

try:
    from homeassistant.const import ELECTRIC_POTENTIAL_VOLT
except ImportError:
    ELECTRIC_POTENTIAL_VOLT = "V"

try:
    from homeassistant.const import POWER_VOLT_AMPERE
except ImportError:
    POWER_VOLT_AMPERE = "VA"

from homeassistant.core import HomeAssistant
from ingeniumpy import IngeniumAPI
from ingeniumpy.objects import (
    IngMeterBus,
    IngSif,
    IngAirSensor,
    IngActuator,
    IngNoiseSensor,
)

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
):
    api: IngeniumAPI = hass.data[DOMAIN][entry.entry_id]

    async_add_entities([MeterBusSensor(obj, channel) for obj, channel in api.get_meterbuses()])
    async_add_entities([SifSensor(obj, mode) for obj, mode in api.get_sifs()])
    async_add_entities([AirSensor(obj, mode) for obj, mode in api.get_air_sensors()])
    async_add_entities([NoiseSensor(obj) for obj in api.get_noise_sensors()])

    # Para los sensores de tipo Socket, se itera de 0 a 3 (4 modos) sobre los actuadores que son “sock”
    for mode in range(0, 4):
        async_add_entities([SockSensor(obj, mode) for obj in api.get_switches() if obj.is_sock])


class MeterBusSensor(SensorEntity):
    def __init__(self, obj: IngMeterBus, channel: int):
        self._obj = obj
        self._channel = channel
        self._attr_state_class = STATE_CLASS_MEASUREMENT
        self._attr_name = f"{obj.component.label} C{channel}"
        self._attr_unique_id = f"{DOMAIN}.{obj.component.id}_C{channel}"

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, f"update_{DOMAIN}_{self._obj.address}", self.async_write_ha_state
            )
        )

    @property
    def available(self) -> bool:
        return self._obj.get_available(self._channel)

    @property
    def native_value(self):
        return self._obj.get_value(self._channel)

    @property
    def unit_of_measurement(self):
        return POWER_WATT

    @property
    def device_class(self):
        return DEVICE_CLASS_POWER

    @property
    def device_info(self):
        return self._obj.get_info()


class SifSensor(SensorEntity):
    def __init__(self, obj: IngSif, mode: int):
        self._obj = obj
        self._mode = mode
        self._attr_state_class = STATE_CLASS_MEASUREMENT
        if mode == 0:
            self._attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS

        modes_names = ["T", "S", "P", "L", "H"]
        self._attr_name = f"{obj.component.label} {modes_names[mode]}"
        self._attr_unique_id = f"{DOMAIN}.{obj.component.id}_{modes_names[mode]}"

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, f"update_{DOMAIN}_{self._obj.address}", self.async_write_ha_state
            )
        )

    @property
    def available(self) -> bool:
        return self._obj.get_available(self._mode)

    @property
    def native_value(self):
        return self._obj.get_value(self._mode)

    # Compatibilidad: se conserva state para versiones anteriores, aunque native_value es el recomendado.
    @property
    def state(self):
        return self.native_value

    @property
    def extra_state_attributes(self):
        attrs = {}
        if self._obj.bat_baja:
            attrs["bat_baja"] = True
        return attrs

    @property
    def native_unit_of_measurement(self):
        return [UnitOfTemperature.CELSIUS, None, "Detected", "lx", PERCENTAGE][self._mode]

    @property
    def device_class(self):
        return [
            DEVICE_CLASS_TEMPERATURE,
            None,
            "presence",
            DEVICE_CLASS_ILLUMINANCE,
            DEVICE_CLASS_HUMIDITY,
        ][self._mode]

    @property
    def device_info(self):
        return self._obj.get_info()


class AirSensor(SensorEntity):
    def __init__(self, obj: IngAirSensor, mode: int):
        self._obj = obj
        self._mode = mode
        self._attr_state_class = STATE_CLASS_MEASUREMENT

        if mode == 0:
            self._attr_name = f"{obj.component.label} CO2"
            self._attr_unique_id = f"{DOMAIN}.{obj.component.id}_co2"
        elif mode == 1:
            self._attr_name = f"{obj.component.label} VOCs"
            self._attr_unique_id = f"{DOMAIN}.{obj.component.id}_vocs"
        elif mode == 2:
            self._attr_name = f"{obj.component.label} Temp"
            self._attr_unique_id = f"{DOMAIN}.{obj.component.id}_temp"
        elif mode == 3:
            self._attr_name = f"{obj.component.label} Hum"
            self._attr_unique_id = f"{DOMAIN}.{obj.component.id}_hum"

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, f"update_{DOMAIN}_{self._obj.address}", self.async_write_ha_state
            )
        )

    @property
    def available(self) -> bool:
        return self._obj.get_available(self._mode)

    @property
    def native_value(self):
        return self._obj.get_value(self._mode)

    @property
    def extra_state_attributes(self):
        if self._mode in (0, 1):
            return {"threshold": self._obj.get_threshold(self._mode)}
        return {}

    @property
    def unit_of_measurement(self):
        return [
            CONCENTRATION_PARTS_PER_MILLION,
            CONCENTRATION_PARTS_PER_MILLION,
            UnitOfTemperature.CELSIUS,
            PERCENTAGE,
        ][self._mode]

    @property
    def device_class(self):
        return [DEVICE_CLASS_CO2, None, DEVICE_CLASS_TEMPERATURE, DEVICE_CLASS_HUMIDITY][self._mode]

    @property
    def device_info(self):
        return self._obj.get_info()


class NoiseSensor(SensorEntity):
    def __init__(self, obj: IngNoiseSensor):
        self._obj = obj
        self._attr_state_class = STATE_CLASS_MEASUREMENT
        self._attr_name = obj.component.label
        self._attr_unique_id = f"{DOMAIN}.{obj.component.id}"
    
    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, f"update_{DOMAIN}_{self._obj.address}", self.async_write_ha_state
            )
        )
    
    @property
    def available(self) -> bool:
        return self._obj.get_available()
    
    @property
    def native_value(self):
        return self._obj.get_value()
    
    @property
    def extra_state_attributes(self):
        attrs = {}
        if self._obj.max != 255:
            attrs["max"] = self._obj.max
        if self._obj.min != 255:
            attrs["min"] = self._obj.min
        return attrs

    @property
    def unit_of_measurement(self):
        return SIGNAL_STRENGTH_DECIBELS

    @property
    def device_info(self):
        return self._obj.get_info()


class SockSensor(SensorEntity):
    def __init__(self, obj: IngActuator, mode: int):
        self._obj = obj
        self._mode = mode
        self._attr_state_class = STATE_CLASS_MEASUREMENT

        modes_names = ["I", "V", "PA", "P"]
        self._attr_name = f"{obj.component.label} {modes_names[mode]}"
        self._attr_unique_id = f"{DOMAIN}.{obj.component.id}_{modes_names[mode]}"

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, f"update_{DOMAIN}_{self._obj.address}", self.async_write_ha_state
            )
        )

    @property
    def available(self) -> bool:
        return self._obj.available

    @property
    def native_value(self):
        if self._mode == 0:
            return self._obj.current if self._obj.current != -1 else None
        if self._mode == 1:
            return self._obj.voltage if self._obj.voltage != -1 else None
        if self._mode == 2:
            return self._obj.active_power if self._obj.active_power != -1 else None
        if self._mode == 3:
            return self._obj.consumption if self._obj.consumption != -1 else None
        return None

    @property
    def unit_of_measurement(self):
        return [ELECTRIC_CURRENT_AMPERE, ELECTRIC_POTENTIAL_VOLT, POWER_WATT, POWER_VOLT_AMPERE][self._mode]

    @property
    def device_class(self):
        return [DEVICE_CLASS_CURRENT, DEVICE_CLASS_VOLTAGE, DEVICE_CLASS_POWER, None][self._mode]

    @property
    def device_info(self):
        return self._obj.get_info()
