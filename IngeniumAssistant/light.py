import logging

from homeassistant.helpers.dispatcher import async_dispatcher_connect

try:
    from homeassistant.components.light import LightEntity
except ImportError:
    from homeassistant.components.light import Light as LightEntity

from homeassistant.components.light import SUPPORT_BRIGHTNESS, ATTR_BRIGHTNESS
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from ingeniumpy import IngeniumAPI
from ingeniumpy.objects import IngBusingRegulator

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities):
    api: IngeniumAPI = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([IngRegulator(o) for o in api.get_lights()])


class IngRegulator(LightEntity):
    def __init__(self, obj: IngBusingRegulator):
        self._obj = obj
        self._unique_id = f"{DOMAIN}.{obj.component.id}"
        # No se asigna manualmente entity_id, Home Assistant lo gestiona automáticamente.

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
        """No se requiere sondeo, se actualiza mediante notificaciones push."""
        return False

    @property
    def available(self) -> bool:
        return self._obj.available

    @property
    def supported_features(self):
        return SUPPORT_BRIGHTNESS

    @property
    def brightness(self):
        return self._obj.get_value(self._obj.component.output)

    @property
    def is_on(self):
        return self.brightness > 1

    async def async_turn_on(self, **kwargs):
        value = kwargs.get(ATTR_BRIGHTNESS, 255)
        await self._obj.set_value(self._obj.component.output, value)
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs):
        value = kwargs.get(ATTR_BRIGHTNESS, 0)
        await self._obj.set_value(self._obj.component.output, value)
        self.async_write_ha_state()

    @property
    def device_info(self):
        return self._obj.get_info()