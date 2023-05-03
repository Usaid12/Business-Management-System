with open('migration_no.txt','r') as hd:
    num = int(hd.read())
file = open(f'./src/database/migrations/migration_no_{num}.ts' , 'w') 
num += 1
file.close()
with open('migration_no.txt' ,'w') as hd:
    hd.write(str(num))