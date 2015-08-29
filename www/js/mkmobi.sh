#!/bin/sh

node ./mobify.js ../vbush-ibooks.html > vbush-kindle.html

cat ./vbush-kindle.html > /Users/asm/code/EpubFramework/ops-src/vbush.epub-mobi/OEBPS/vbush.html

cat readsocial/lib/jquery-1.7.2.min.js readsocial/lib/underscore.js readsocial/libRSHASH.js readsocial/libRSSel.js readsocial/libRSTmpl.js readsocial/libRSAPI.js readsocial.js > /Users/asm/code/EpubFramework/ops-src/vbush.epub-mobi/OEBPS/js/readsocial.js

cd /Users/asm/code/EpubFramework
./bin/mkepub.sh /Users/asm/code/EpubFramework/ops-src/vbush.epub-mobi

kindlegen /Users/asm/code/EpubFramework/epub-build/vbush.epub-mobi.epub