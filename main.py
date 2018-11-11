import socket
import serial
import time
import json
from decimal import Decimal
#json_data = '{"distance": "0"}'
d = {}

ip = '0.0.0.0' #IP
port = 9000 #Porta
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #Criando socket do tipo TCP/IP

try:
    server.bind ((ip,port))                             #Ligando o servidor
    server.listen(5)                                    #Abrindo conexão para 5 clientes
    print ('Listening on ', ip,': ', port)              #Imprimindo IP e PORTA do servidor
    (obj,cliente) = server.accept()                     #Esperando conexão e armazenando o objeto de conexão e dados do cliente (IP e PORTA)
    print ('Connection received from: ', cliente[0])    #Imprimindo o IP do cliente
    while(True):
        msg = obj.recv(1024)                            #Aguardando mensagem do cliente
        print (msg[:-1])
        if(msg):
            print (msg)
            ser = serial.Serial('COM8', 9600, timeout=0)
            while 1:
                try:
                    data = str(ser.readline())
                    data = data.replace('b', '')
                    data = data.replace('\'', '')
                    data = data.replace('\\n', '')
                    data = data.replace('\\r', '')
                    #print (json_data)
                    d["distance"] = data
                    print (json.dumps(d, ensure_ascii=False))
                    obj.sendall(json.dumps(d).encode('utf-8'))
                    time.sleep(1)
                except Exception as erro:
                    print(erro)
                    time.sleep(1)
    server.close()
except Exception as erro:
    print (erro)
    server.close()
# 
