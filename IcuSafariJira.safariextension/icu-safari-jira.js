// Part of ICU tools
// Copyright (C) 2016 and later: Unicode, Inc. and others.
// License & terms of use: http://www.unicode.org/copyright.html

'use strict';
const ces = document.getElementsByClassName('commit');

for(let ce of ces) {
    const linksBox = document.createElement('div');
    linksBox.appendChild(document.createTextNode('JIRA: '));
    ce.appendChild(linksBox);

    // now, what to add?
    const s = new Set(); // set of issue links

    for(let subnode of ce.childNodes) {
        const linkmatch=/ICU-[0-9]+/g;
        let r;
        while ((r = linkmatch.exec(subnode.textContent)) !== null) {
            s.add(r[0]);
        }
    }

    for(let v of s.values()) {
        const a = document.createElement('a');
        a.appendChild(document.createTextNode(v));
        a.href=`https://unicode-org.atlassian.net/browse/${v}`;
        linksBox.appendChild(a);
        linksBox.appendChild(document.createTextNode(' '));
    }
}

