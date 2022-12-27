# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
import aiosendgrid
from sendgrid.helpers.mail import Email, Mail, Personalization


async def send_email(template_id: str, sender_email: str, receiver_data: dict or list, send_to_multiple: bool = False) -> None:
    '''
    Send a personalized templated email to one or multiple receivers via SendGrid
    '''
    try:
        email_message = Mail()

        if send_to_multiple:
            if type(receiver_data) != list:
                raise TypeError(f'receiver_data expects {list}. Passed object has type {type(receiver_data)}')
            else:
                for r in receiver_data:
                    p = Personalization()
                    p.add_to(Email(email=r['email'], dynamic_template_data=r))
                    email_message.add_personalization(p)
        else:
            if type(receiver_data) != dict:
                raise TypeError(f'receiver_data expects {dict}. Passed object has type {type(receiver_data)}')
            else:
                p = Personalization()
                p.add_to(Email(email=receiver_data['email'], dynamic_template_data=receiver_data))
                email_message.add_personalization(p)

        email_message.from_email = sender_email
        email_message.template_id = template_id

        async with aiosendgrid.AsyncSendGridClient(api_key=SENDGRID_API_KEY) as client:
            response = await client.send_mail_v3(body=email_message.get())
            print(response.status_code)
            print(response.headers)
    except Exception as e:
        print(e)
