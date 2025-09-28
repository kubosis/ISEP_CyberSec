from flask import Flask, request, make_response
import hmac, hashlib, base64

app = Flask(__name__)

FLAG_PATH = "/flag.txt"

def sign(username, key):
    return hmac.new(key.encode(), username.encode(), hashlib.sha256).hexdigest()

@app.route("/")
def index():
    return """<h2>Welcome to ISEP CTF - Hard Challenge (Web)</h2>
<p>This web app uses an HMAC-signed session cookie. Find the secret key (hidden in the site image metadata), craft a cookie for user <b>admin</b>, then visit <a href="/flag">/flag</a>.</p>
<img src="/static/logo.png" alt="logo">"""

@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username","guest")
    resp = make_response("Logged in as %s. Use the session cookie to access /flag." % username)
    key = "unknown"
    # set a dummy cookie
    resp.set_cookie("session", f"{username}|{sign(username,key)}")
    return resp

@app.route("/flag")
def flag():
    sess = request.cookies.get("session", "")
    if "|" not in sess:
        return "Invalid session cookie", 400
    username, sig = sess.split("|", 1)

    # secret is hidden in PNG metadata
    from PIL import Image
    key = Image.open("static/logo.png").info.get("ctf_key")

    if not key:
        return "Server misconfigured (no key)", 500

    expected = sign(username, key)
    if hmac.compare_digest(expected, sig) and username == "admin":
        flag = os.environ.get("CTF_FLAG", "FLAG_NOT_SET")
        return flag

    return "Access denied", 403


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
