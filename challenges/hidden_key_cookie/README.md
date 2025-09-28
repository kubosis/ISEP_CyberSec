# Hidden Key Cookie (Web / Hard)

## Challenge Overview
This challenge is a small Flask web app that protects a flag behind an HMAC-signed session cookie.  
The secret key needed to forge the cookie is hidden inside the PNG image metadata at `/static/logo.png`.

Players must:
1. Extract the secret key from the PNG (`ctf_key` field).
2. Use it to compute an HMAC-SHA256 signature for the username `admin`.
3. Craft a cookie in the format:  
   ```
   session=admin|<hex_signature>
   ```
4. Send a request with this cookie to `/flag` to retrieve the flag.


## Build & Run Instructions (Organizer / Local Test)

When building, **inject the flag** using a Docker build argument:

```bash
docker build --build-arg FLAG="ISEP{your_real_flag_here}" -t isep_ctf_hiddenkey_player:latest .
docker run --rm -p 5000:5000 isep_ctf_hiddenkey_player:latest
```

The app will start at:  
👉 http://localhost:5000


## Hints for Players

1. Download the logo:
   ```bash
   curl -sS http://localhost:5000/static/logo.png -o logo.png
   ```

2. Extract the PNG metadata:
   ```bash
   strings logo.png | grep ctf_key
   ```
   or (if you have exiftool):
   ```bash
   exiftool logo.png
   ```

   You’ll find the hidden `ctf_key` value.

3. Compute the HMAC-SHA256 signature for `admin` using that key:
   ```python
   import hmac, hashlib
   key = "PASTE_ctf_key_HERE"
   username = "admin"
   sig = hmac.new(key.encode(), username.encode(), hashlib.sha256).hexdigest()
   print(sig)
   ```

4. Send the cookie with curl:
   ```bash
   curl -sS -H "Cookie: session=admin|<hexsig>" http://localhost:5000/flag
   ```

If the cookie is valid, you’ll receive the flag you set at build time.
