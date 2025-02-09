import logging

from homeassistant.components.cover import ATTR_POSITION
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from ingeniumpy import IngeniumAPI
from ingeniumpy.objects import IngActuator

try:
    from homeassistant.components.cover import DEVICE_CLASS_BLIND
except ImportError:
    DEVICE_CLASS_BLIND = "blind"

# Backwards compatibility
try:
    from homeassistant.components.cover import CoverEntity
except ImportError:
    from homeassistant.components.cover import CoverDevice as CoverEntity

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities):
    api: IngeniumAPI = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([IngCover(o) for o in api.get_covers()])


class IngCover(CoverEntity):
    def __init__(self, obj: IngActuator):
        self._obj = obj
        self._unique_id = f"{DOMAIN}.{obj.component.id}"
        # Se elimina la asignación manual de entity_id

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, f"update_{DOMAIN}_{self._obj.address}", self.async_write_ha_state
            )
        )

    @property
    def device_class(self):
        return DEVICE_CLASS_BLIND

    @property
    def unique_id(self):
        return self._unique_id

    @property
    def name(self):
        """Nombre del dispositivo."""
        return self._obj.component.label

    @property
    def should_poll(self):
        """No es necesario sondear, ya que se actualiza mediante notificaciones push."""
        return False

    @property
    def available(self) -> bool:
        return self._obj.available

    @property
    def current_cover_position(self):
        return self._obj.get_cover_val()

    @property
    def is_closed(self):
        return self._obj.get_cover_val() == 0

    async def async_open_cover(self):
        await self._obj.set_cover_val(100)
        self.async_write_ha_state()

    async def async_close_cover(self):
        await self._obj.set_cover_val(0)
        self.async_write_ha_state()

    async def async_open_cover_tilt(self):
        pass

    async def async_close_cover_tilt(self):
        pass

    async def async_set_cover_position(self, **kwargs):
        position = kwargs.get(ATTR_POSITION)
        if position is not None:
            await self._obj.set_cover_val(position)
            self.async_write_ha_state()

    async def async_set_cover_tilt_position(self, **kwargs):
        pass

    @property
    def device_info(self):
        return self._obj.get_info()