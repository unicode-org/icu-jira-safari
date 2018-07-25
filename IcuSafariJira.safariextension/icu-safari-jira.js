// Part of ICU tools
// Copyright (C) 2016 and later: Unicode, Inc. and others.
// License & terms of use: http://www.unicode.org/copyright.html

'use strict';

// TODO: should be onload
(function (){
    const jirasite = 'https://unicode-org.atlassian.net';
    const proxsite = jirasite;
    // const _icuLinkifyCache = {};

    // WILL ONLY WORK if you disable CORS somehow.
    function updateStatus(id, elem) {
        if(window.fetch) {
            fetch(`${proxsite}/rest/api/2/issue/${id}?fields=status`)
            .then(function(response) {
                const json = response.json();
                json.then((json) => {
                    if(json && json.fields && json.fields.status) {
                        const aspan = document.createElement('span');
                        aspan.className='IssueLabel text-small';
                        aspan.appendChild(document.createTextNode(json.fields.status.name));
                        elem.appendChild(document.createTextNode(' '));
                        elem.appendChild(aspan);
                        elem.prep
                    }
                });
            })
            .then(function(myJson) {
                // console.log(myJson);
            });
        }      
    }

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
                // linksBox.appendChild(document.createTextNode('JIRA: '));
                ce.appendChild(linksBox);
            
                for(let v of s.values()) {
                    const a = document.createElement('a');
                    a.className = 'btn btn-sm';
                    a.appendChild(document.createTextNode(v));
                    a.href=`${jirasite}/browse/${v}`;
                    updateStatus(v, a);
                    linksBox.appendChild(a);
                    linksBox.appendChild(document.createTextNode(' '));
                }
            }
        }
    }
    icuLinkify('commit');
    icuLinkify('gh-header-title');
    icuLinkify('js-issue-row');
})();

