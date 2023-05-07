import datetime


print('Enter the file name')
file_name = input()

presentDate = datetime.datetime.now()
unix_timestamp = int(datetime.datetime.timestamp(presentDate)*1000)





file = open(f'./src/database/migrations/{unix_timestamp}-{file_name}.ts' , 'w') 
file.close()
