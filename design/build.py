s=open('page.html').read()
for k,f in [('ART','art.js'),('SCENES','scenes.js'),('GAMES','games.js'),('APP','app.js')]:
    s=s.replace('/*%s*/'%k,open(f).read())
open('plushie-meadow.html','w').write(s)
