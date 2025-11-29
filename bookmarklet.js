(function () {
    try {
        var u = 'https://mutlaq001.github.io/Absence-calculator/';
        var l = document.querySelectorAll('a[id^="Href"]');
        var c = {};
        var f = 0;

        function gH(s) {
            if (!s) return 0;
            var m = s.match(/(\d{1,2}[:.]\d{2})\s*[-–]\s*(\d{1,2}[:.]\d{2})/);
            if (!m) return 0;
            var t1 = m[1].split(/[.:]/);
            var t2 = m[2].split(/[.:]/);
            var m1 = parseInt(t1[0]) * 60 + parseInt(t1[1]);
            var m2 = parseInt(t2[0]) * 60 + parseInt(t2[1]);
            var d = m2 - m1;
            if (d < 0) d += 720;
            return Math.round((d / 50) * 2) / 2;
        }

        for (var i = 0; i < l.length; i++) {
            var a = l[i];
            var n = a.textContent.replace(/<!--.*?-->/g, '').trim();
            var r = a.closest('tr');
            if (!r) continue;
            var txt = r.innerText || r.textContent;
            var hr = gH(txt);

            if (hr > 0) {
                var dy = "";
                if (txt.match(/(U|الأحد)/)) dy = "الأحد";
                else if (txt.match(/(M|Monday|الإثنين|الاثنين)/)) dy = "الاثنين";
                else if (txt.match(/(T|Tuesday|الثلاثاء)/) && !txt.match(/Thursday|الخميس/)) dy = "الثلاثاء";
                else if (txt.match(/(W|Wednesday|الأربعاء)/)) dy = "الأربعاء";
                else if (txt.match(/(R|Thursday|الخميس)/)) dy = "الخميس";
                else dy = "محاضرة";

                if (!c[n]) {
                    c[n] = {
                        t: 0,
                        d: []
                    };
                }
                var ex = c[n].d.some(function (x) {
                    return x.day === dy && x.hours === hr;
                });
                if (!ex || dy === "محاضرة") {
                    c[n].t += hr;
                    c[n].d.push({
                        day: dy,
                        hours: hr
                    });
                }
                f = 1;
            }
        }

        if (!f) {
            alert('لم يتم العثور على بيانات الجدول في هذه الصفحة.');
            return;
        }

        var res = [];
        for (var k in c) {
            res.push({
                name: k,
                lectureHours: c[k].t,
                absenceHours: 0,
                id: Date.now() + Math.random(),
                schedule: c[k].d
            });
        }

        window.location.href = u + '?import=' + encodeURIComponent(JSON.stringify(res));

    } catch (e) {
        alert(e.message);
    }
})();
