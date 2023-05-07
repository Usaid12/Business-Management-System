import datetime

time1 = str(datetime.datetime.utcnow())
utctime = time1.replace(':' , '_')


file = open(f'./src/database/migrations/migration_at_{utctime}.ts' , 'w') 
file.close()
