secret = bytes. fromhex("e767dc7c3f6c2edfa748f266bf3d575e89b2107f190ee63fd354cd10bacb3b66")
key = bytes. fromhex("c747fc144b185eac9d67dd02d64e3431fbd63e187e21a54899019869db8c5501")
result = bytes (a ^ b for
a, b in zip(secret, key))
print (result. decode())