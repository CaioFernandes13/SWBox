from flask import Flask
import serial
import json
app = Flask(__name__)
 
@app.route("/")
def serialJSON():
    
    d = {}
    data = str(ser.readline())
    data = data.replace('b', '')
    data = data.replace('\'', '')
    data = data.replace('\\n', '')
    data = data.replace('\\r', '')
    print (data)
    d["distance"] = data
    #print json.dumps(d, ensure_ascii=False)
    #distance = float(ser.readline())
    return json.dumps(d, ensure_ascii=False)
 
if __name__ == "__main__":
    ser = serial.Serial('COM6', 9600, timeout=0)
    app.run()