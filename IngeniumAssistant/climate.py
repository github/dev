import logging

from homeassistant.components.climate import (
    ClimateEntity,
    UnitOfTemperature,
    HVAC_MODE_OFF,
    HVAC_MODE_HEAT,
    HVAC_MODE_COOL,
    HVAC_MODE_HEAT_COOL,
    SUPPORT_TARGET_TEMPERATURE,
)
from homeassistant.components.climate.const import (
    CURRENT_HVAC_OFF,
    CURRENT_HVAC_HEAT,
    CURRENT_HVAC_COOL,
)
from homeassistant.const import ATTR_TEMPERATURE
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from ingeniumpy import IngeniumAPI
from ingeniumpy.objects import IngThermostat

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities):
    api: IngeniumAPI = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([IngClimate(o) for o in api.get_climates()])


class IngClimate(ClimateEntity):
    def __init__(self, obj: IngThermostat):
        self._obj = obj
        self._unique_id = f"{DOMAIN}.{obj.component.id}"
        self._modes = [HVAC_MODE_OFF, HVAC_MODE_HEAT, HVAC_MODE_COOL, HVAC_MODE_HEAT_COOL]

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                f"update_{DOMAIN}_{self._obj.address}",
                self.async_write_ha_state,
            )
        )

    @property
    def unique_id(self):
        """Identificador único para el dispositivo."""
        return self._unique_id

    @property
    def name(self):
        """Nombre del dispositivo."""
        return self._obj.component.label

    @property
    def should_poll(self):
        """No es necesario sondear porque se actualiza mediante notificaciones."""
        return False

    @property
    def available(self) -> bool:
        return self._obj.available

    @property
    def temperature_unit(self):
        return UnitOfTemperature.CELSIUS

    @property
    def target_temperature_step(self):
        """Paso mínimo de ajuste de temperatura."""
        return 0.2

    @property
    def max_temp(self):
        return 51

    @property
    def min_temp(self):
        return 0

    @property
    def supported_features(self):
        return SUPPORT_TARGET_TEMPERATURE

    @property
    def hvac_modes(self):
        return self._modes

    @property
    def current_temperature(self):
        return self._obj.temp

    @property
    def current_humidity(self):
        return 0

    @property
    def target_temperature(self):
        return self._obj.set_point

    @property
    def hvac_mode(self):
        return self._modes[self._obj.get_mode()]

    @property
    def hvac_action(self):
        return [CURRENT_HVAC_OFF, CURRENT_HVAC_HEAT, CURRENT_HVAC_COOL][self._obj.get_action()]

    async def async_set_hvac_mode(self, hvac_mode: str):
        await self._obj.set_mode(self._modes.index(hvac_mode))
        self.async_write_ha_state()

    async def async_set_humidity(self, humidity: int):
        # Implementar si la integración soporta ajustes de humedad.
        pass

    async def async_set_temperature(self, **kwargs):
        temperature = kwargs.get(ATTR_TEMPERATURE)
        if temperature is None:
            return
        await self._obj.set_temp(temperature)
        self.async_write_ha_state()

    @property
    def device_info(self):
        return self._obj.get_info()
