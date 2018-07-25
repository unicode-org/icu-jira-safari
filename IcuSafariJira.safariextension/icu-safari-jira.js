// Part of ICU tools
// Copyright (C) 2016 and later: Unicode, Inc. and others.
// License & terms of use: http://www.unicode.org/copyright.html

'use strict';

function icuLinkify(clazz) {
    const ces = document.getElementsByClassName(clazz);
    for(let ce of ces) {
        const linksBox = document.createElement('div');

        // now, what to add?
        const s = new Set(); // set of issue links

        for(let subnode of ce.childNodes) {
            const linkmatch=/ICU-[0-9]+/g;
            let r;
            while ((r = linkmatch.exec(subnode.textContent)) !== null) {
                s.add(r[0]);
            }
        }

        if(s.size) {
            linksBox.appendChild(document.createTextNode('JIRA: '));
            ce.appendChild(linksBox);
        
            for(let v of s.values()) {
                const a = document.createElement('a');
                a.appendChild(document.createTextNode(v));
                a.href=`https://unicode-org.atlassian.net/browse/${v}`;
                linksBox.appendChild(a);
                linksBox.appendChild(document.createTextNode(' '));
            }
        }
    }
}
icuLinkify('commit');
icuLinkify('gh-header-title');
icuLinkify('js-issue-row');
