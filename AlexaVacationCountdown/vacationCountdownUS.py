###This code is modified from the original birthday Alexa skill provided by AWS in order
## to call a function that will countdown to the user's next vacation

import requests
import logging
from datetime import datetime
from pytz import timezone

from ask_sdk_s3.adapter import S3Adapter
from ask_sdk_core.skill_builder import CustomSkillBuilder
from ask_sdk_core.dispatch_components import (
    AbstractRequestHandler, AbstractExceptionHandler
)
from ask_sdk_core.utils import is_request_type, is_intent_name

s3_adapter = S3Adapter(bucket_name="custom-walk-testing")
sb = CustomSkillBuilder(persistence_adapter=s3_adapter)

logger = logging.getLogger("main")
logger.setLevel(logging.INFO)


class LaunchRequestIntentHandler(AbstractRequestHandler):
    """
    Handler for Skill Launch
    """
    def can_handle(self, handler_input):
        return is_request_type("LaunchRequest")(handler_input)

    def handle(self, handler_input):
        speech = "Hello! Welcome to Vacation Planner. When is your vacation, and where are you going?"
        reprompt = "You can say something like, 'My vacation is on December 25th, and I'm going to Hawaii.'"

        handler_input.response_builder.speak(speech).ask(reprompt)
        return handler_input.response_builder.response


class HasVacationLaunchRequestHandler(AbstractRequestHandler):
    """
    Handler for launch after they have set their vacation
    """
    def can_handle(self, handler_input):
        # extract persistent attributes and check if they are all present
        attr = handler_input.attributes_manager.persistent_attributes
        attributes_are_present = ("month" in attr and "day" in attr and "destination" in attr)

        return attributes_are_present and is_request_type("LaunchRequest")(handler_input)

    def handle(self, handler_input):
        attr = handler_input.attributes_manager.persistent_attributes

        month = attr['month']  # month is a string, and we need to convert it to a month index later
        day = int(attr['day'])
        destination = attr['destination']

        # get device id / timezones
        sys_object = handler_input.request_envelope.context.system
        
        # get systems api information 
        api_endpoint = sys_object.api_endpoint
        device_id = sys_object.device.device_id
        api_access_token = sys_object.api_access_token

        # construct systems api timezone url 
        url = '{api_endpoint}/v2/devices/{device_id}/settings/System.timeZone'.format(api_endpoint=api_endpoint, device_id=device_id)
        headers = {'Authorization': 'Bearer ' + api_access_token}

        user_time_zone = ""
        try:
            r = requests.get(url, headers=headers)
            res = r.json()
            logger.info("Device API result: {}".format(str(res)))
            user_time_zone = res
        except Exception:
            handler_input.response_builder.speak("There was a problem connecting to the service")
            return handler_input.response_builder.response

        # getting the current date with the time
        now_time = datetime.now(timezone(user_time_zone))
        
        # Removing the time from the date because it affects our difference calculation
        now_date = datetime(now_time.year, now_time.month, now_time.day)

        # getting the next vacation date
        month_as_index = list(calendar.month_abbr).index(month[:3].title())
        next_vacation = datetime(now_time.year, month_as_index, day)

        # check if we need to adjust vacation date by one year
        if now_date > next_vacation:    
            next_vacation = datetime(
                now_time.year + 1,
                month_as_index,
                day
            )

        # setting the default speak_output to Happy Vacation!!
        speak_output = "Happy vacation!"
        if now_date != next_vacation:
            diff_days = abs((now_date - next_vacation).days)
            speak_output = "Welcome back. It looks like there are \
                            {days} days until your vacation to {destination}".format(
                                days=diff_days,
                                destination=destination
                            )

        handler_input.response_builder.speak(speak_output)
        return handler_input.response_builder.response


class VacationIntentHandler(AbstractRequestHandler):
    """
    Handler for Capturing the Vacation details
    """
    def can_handle(self, handler_input):
        return is_intent_name("CaptureVacationIntent")(handler_input)

    def handle(self, handler_input):
        slots = handler_input.request_envelope.request.intent.slots

        # extract slot values
        month = slots["month"].value
        day = slots["day"].value
        destination = slots["destination"].value

        # save slots into session attributes
        session_attr = handler_input.attributes_manager.session_attributes
        session_attr['month'] = month
        session_attr['day'] = day
        session_attr['destination'] = destination

        # save session attributes as persistent attributes
        handler_input.attributes_manager.persistent_attributes = session_attr
        handler_input.attributes_manager.save_persistent_attributes()

        speech = 'Thanks, I will remember that your vacation is on {month} {day}, \
            and you are going to {destination}'.format(month=month, day=day, destination=destination)
        handler_input.response_builder.speak(speech)
        return handler_input.response_builder.response


class HelpIntentHandler(AbstractRequestHandler):
    """
    Handler for AMAZON.HelpIntent
    """
    def can_handle(self, handler_input):
        return is_intent_name("AMAZON.HelpIntent")(handler_input)

    def handle(self, handler_input):
        speak_output = "You can say hello to me! How can I help?"

        handler_input.response_builder.speak(
            speak_output
            ).ask(speak_output)
        return handler_input.response_builder.response


class CatchAllExceptionHandler(AbstractExceptionHandler):
    """
    Catch all exception handler, log exception and
    respond with a custom message.
    """
    def can_handle(self, handler_input, exception):
        return True

    def handle(self, handler_input, exception):

        speak_output = "Sorry, I couldn't understand what you said. Please try again."
        handler_input.response_builder.speak(speak_output).ask(speak_output)
        return handler_input.response_builder.response


class CancelAndStopIntentHandler(AbstractRequestHandler):
    """
    Handler for AMAZON.CancelIntent and AMAZON.StopIntent
    """
    def can_handle(self, handler_input):
        return is_intent_name("AMAZON.CancelIntent")(handler_input) \
            and is_intent_name("AMAZON.StopIntent")(handler_input)

    def handle(self, handler_input):
        speak_output = "Goodbye!"
        handler_input.response_builder.speak(speak_output)
        return handler_input.response_builder.response


class SessionEndedRequestHandler(AbstractRequestHandler):
    """
    Handler for SessionEndedRequest
    """
    def can_handle(self, handler_input):
        return is_request_type("SessionEndedRequest")(handler_input)

    def handle(self, handler_input):
        # Any cleanup logic goes here
        return handler_input.response_builder.response


# register request / intent handlers
sb.add_request_handler(HasVacationLaunchRequestHandler())
sb.add_request_handler(LaunchRequestIntentHandler())
sb.add_request_handler(VacationIntentHandler())
sb.add_request_handler(HelpIntentHandler())
sb.add_request_handler(CancelAndStopIntentHandler())
sb.add_request_handler(SessionEndedRequestHandler())

# register exception handlers
sb.add_exception_handler(CatchAllExceptionHandler())

lambda_handler = sb.lambda_handler()
