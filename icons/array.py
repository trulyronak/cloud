f = open('filetypes.txt')
line = "["

for l in f.readlines():
	a = l.split('.')
	a = a[0]
	line += '"'
	line += a
	line += '"'
	line += ","
line = line[:-1]
line += ']'
print line

