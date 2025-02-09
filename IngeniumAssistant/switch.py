import logging

from homeassistant.helpers.dispatcher import async_dispatcher_connect

from ingeniumpy import IngeniumAPI
from ingeniumpy.objects import IngActuator

try:
    from homeassistant.components.switch import SwitchEntity, SwitchDeviceClass
except ImportError:
    from homeassistant.components.switch import SwitchEntity, SwitchDeviceClass

try:
    from homeassistant.components.switch import DEVICE_CLASS_SWITCH
except ImportError:
    DEVICE_CLASS_SWITCH = "switch"

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities
):
    """Set up switch devices."""
    api: IngeniumAPI = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([IngSwitch(o) for o in api.get_switches()])

class IngSwitch(SwitchEntity):
    def __init__(self, obj: IngActuator):
        self._obj = obj
        self._unique_id = f"{DOMAIN}.{obj.component.id}"
        # No es necesario asignar entity_id, Home Assistant lo gestiona automáticamente.

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                f"update_{DOMAIN}_{self._obj.address}",
                self.async_write_ha_state
            )
        )

    @property
    def unique_id(self):
        """Return unique ID for this device."""
        return self._unique_id

    @property
    def name(self):
        """Name of the device."""
        return self._obj.component.label

    @property
    def should_poll(self):
        """No requiere sondeo, se actualiza mediante notificaciones push."""
        return False

    @property
    def available(self) -> bool:
        return self._obj.available

    @property
    def is_on(self):
        """Return whether the switch is on."""
        return self._obj.get_switch_val()

    async def async_turn_on(self, **kwargs):
        """Turn the switch on."""
        await self._obj.action_switch()
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs):
        """Turn the switch off."""
        await self._obj.action_switch()
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self):
        attrs = {}
        if self._obj.voltage == -1 and self._obj.consumption != -1:
            attrs["power"] = self._obj.consumption
        if self._obj.voltage != -1 and self._obj.current != -1:
            attrs["current"] = self._obj.current
        if self._obj.voltage != -1:
            attrs["voltage"] = self._obj.voltage
        if self._obj.active_power != -1:
            attrs["active_power"] = self._obj.active_power
        return attrs

    @property
    def device_class(self):
        """Return the device class."""
        return (
            DEVICE_CLASS_SWITCH
            if self._obj.consumption == -1 and self._obj.voltage == -1
            else SwitchDeviceClass
        )

    @property
    def device_info(self):
        return self._obj.get_info()
