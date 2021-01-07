from flask_mail import Message


def notifyUser(user_email, prod_name, curr_price, expected_price, link, mail):
    print(user_email, prod_name, curr_price, expected_price)
    msg = Message(f'{prod_name} is below expected price!', sender = 'radoslawkarbowiak@gmail.com', recipients = [user_email])
    msg.body = f'Product that you are following droped its price! {prod_name} is now only for {curr_price} zł! Make haste and check it out! Here is a link: {link}'
    mail.send(msg)

