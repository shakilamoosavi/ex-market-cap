import { useLocale, useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

/* --------------------------------------------------
   Helper functions (Gregorian → Jalali)
-------------------------------------------------- */

function toJalali(gy: number, gm: number, gd: number) {
  let g_d_m = [
    0,
    31,
    (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];

  let jy = gy - 621;
  let gy2 = gm > 2 ? gy + 1 : gy;

  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd;

  for (let i = 1; i < gm; i++) days += g_d_m[i];

  let jy2 = jy + 399;
  let j_day_no =
    days -
    (365 * jy2 +
      Math.floor(jy2 / 4) -
      Math.floor(jy2 / 100) +
      Math.floor(jy2 / 400));

  let jm, jd;

  if (j_day_no >= 0) {
    if (j_day_no <= 185) {
      jm = 1 + Math.floor(j_day_no / 31);
      jd = 1 + (j_day_no % 31);
    } else {
      j_day_no -= 186;
      jm = 7 + Math.floor(j_day_no / 30);
      jd = 1 + (j_day_no % 30);
    }
  } else {
    jy -= 1;
    const prevDays = (jy2 - 1) % 4 === 0 ? 366 : 365;
    j_day_no += prevDays;
    if (j_day_no <= 185) {
      jm = 1 + Math.floor(j_day_no / 31);
      jd = 1 + (j_day_no % 31);
    } else {
      j_day_no -= 186;
      jm = 7 + Math.floor(j_day_no / 30);
      jd = 1 + (j_day_no % 30);
    }
  }
  return { jy, jm, jd };
}

/* --------------------------------------------------
   Helper (Jalali → Gregorian)  ← (NEW)
-------------------------------------------------- */
function toGregorian(jy: number, jm: number, jd: number) {
  let gy, gm, gd;
  let jy2 = jy - 979;
  let jm2 = jm - 1;
  let jd2 = jd - 1;

  let j_day_no =
    365 * jy2 + Math.floor(jy2 / 33) * 8 + Math.floor(((jy2 % 33) + 3) / 4);
  for (let i = 0; i < jm2; ++i) {
    j_day_no += i < 6 ? 31 : 30;
  }
  j_day_no += jd2;

  let g_day_no = j_day_no + 79;

  gy = 1600 + 400 * Math.floor(g_day_no / 146097);
  g_day_no %= 146097;

  let leap = true;
  if (g_day_no >= 36525) {
    g_day_no--;
    gy += 100 * Math.floor(g_day_no / 36524);
    g_day_no %= 36524;

    if (g_day_no >= 365) g_day_no++;
    else leap = false;
  }

  gy += 4 * Math.floor(g_day_no / 1461);
  g_day_no %= 1461;

  if (g_day_no >= 366) {
    leap = false;
    g_day_no--;
    gy += Math.floor(g_day_no / 365);
    g_day_no %= 365;
  }

  let daysInGregorianMonth = [
    31,
    leap ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];

  for (gm = 0; gm < 12; gm++) {
    let v = daysInGregorianMonth[gm];
    if (g_day_no < v) break;
    g_day_no -= v;
  }

  gd = g_day_no + 1;
  return { gy, gm: gm + 1, gd };
}

/* --------------------------------------------------
   Other helpers
-------------------------------------------------- */

function jalaliMonthDays(y: number, m: number) {
  if (m <= 6) return 31;
  if (m <= 11) return 30;
  return isJalaliLeap(y) ? 30 : 29;
}

function isJalaliLeap(jy: number) {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818,
    1111, 1181, 1210, 1635, 2060, 2097,
    2192, 2262, 2324, 2394, 2456, 3178
  ];
  let bl = breaks.length;
  let jp = breaks[0];
  if (jy < jp || jy >= breaks[bl - 1]) return false;

  for (let i = 1; i < bl; i++) {
    let jm = breaks[i];
    if (jy < jm) break;
    jp = jm;
  }

  let r = (jy - jp) % 33;
  return [1, 5, 9, 13, 17, 22, 26, 30].includes(r);
}

function gregorianMonthDays(y: number, m: number) {
  const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const days = [
    31, leap ? 29 : 28, 31, 30, 31, 30,
    31, 31, 30, 31, 30, 31
  ];
  return days[m - 1];
}

/* --------------------------------------------------
   Component
-------------------------------------------------- */

export default function AgeRestrictedDateDropdown({
  minAge = 18,
  onChange
}: {
  minAge?: number;
  onChange?: (value: string | null) => void;
}) {
  const locale = useLocale();
  const t = useTranslations("components.ageRestrictedDateDropdown");
  const isJalali = ["fa", "fa-IR"].includes(locale);

  const now = new Date();
  const gy = now.getFullYear();
  const gm = now.getMonth() + 1;
  const gd = now.getDate();

  const jNow = toJalali(gy, gm, gd);

  const maxYear = isJalali ? jNow.jy - minAge : gy - minAge;
  const maxMonth = isJalali ? jNow.jm : gm;
  const maxDay = isJalali ? jNow.jd : gd;

  const [year, setYear] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [day, setDay] = useState<number | "">("");

  const [error, setError] = useState("");

  const [focusYear, setFocusYear] = useState(false);
  const [focusMonth, setFocusMonth] = useState(false);
  const [focusDay, setFocusDay] = useState(false);

  const [touched, setTouched] = useState(false);

  const floatYear = focusYear || year !== "";
  const floatMonth = focusMonth || month !== "";
  const floatDay = focusDay || day !== "";


  const years = Array.from({ length: 100 }, (_, i) => maxYear - i);

  const months = isJalali
    ? ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور",
       "مهر","آبان","آذر","دی","بهمن","اسفند"]
    : ["January","February","March","April","May","June","July",
       "August","September","October","November","December"];

  const getDaysInMonth = () => {
    if (!year || !month) return 31;
    return isJalali
      ? jalaliMonthDays(year, month)
      : gregorianMonthDays(year, month);
  };

  const daysList = Array.from({ length: getDaysInMonth() }, (_, i) => i + 1);

  /* --------------------------------------------------
     UPDATED: onChange always returns GREGORIAN STRING
  -------------------------------------------------- */
  useEffect(() => {
    if (!touched) return;

    if (year && month && day) {
      setError("");

      let gYear = year;
      let gMonth = month;
      let gDay = day;

      if (isJalali) {
        const g = toGregorian(year, month, day);
        gYear = g.gy;
        gMonth = g.gm;
        gDay = g.gd;
      }

      const dateString =
        `${gYear}/${String(gMonth).padStart(2, "0")}/${String(gDay).padStart(2, "0")}`;

      onChange?.(dateString);
      return;
    }

    setError(t("enterDateCompletely"));
    onChange?.(null);
  }, [year, month, day, touched]);

  const labelStyle = (floating: boolean): React.CSSProperties => ({
    position: "absolute",
    left: "16px",
    top: floating ? "6px" : "50%",
    fontSize: floating ? "11px" : "14px",
    color: floating ? "#3b82f6" : "#9ca3af",
    transform: floating ? "translateY(0)" : "translateY(-50%)",
    transition: "all 0.15s ease-out",
    pointerEvents: "none" as const,
    fontWeight: 500
  });


  const boxClass =
    "w-full border border-gray-300 rounded px-4 pt-5 pb-2 text-sm bg-white outline-none focus:border-blue-500";

  return (
    <div className="w-full">
      <div style={{ display: "flex", gap: "12px" }}>
        
        {/* YEAR */}
        <div className="relative w-full">
          <select
            value={year}
            onChange={(e) => {
              setYear(Number(e.target.value));
              setTouched(true);
            }}
            onFocus={() => setFocusYear(true)}
            onBlur={() => setFocusYear(false)}
            className={boxClass}
          >
            <option value="">{}</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <label style={labelStyle(floatYear)}>{t("year")}</label>
        </div>

        {/* MONTH */}
        <div className="relative w-full">
          <select
            value={month}
            onChange={(e) => {
              setMonth(Number(e.target.value));
              setTouched(true);
            }}
            onFocus={() => setFocusMonth(true)}
            onBlur={() => setFocusMonth(false)}
            className={boxClass}
          >
            {months.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
          <label style={labelStyle(floatMonth)}>{t("month")}</label>
        </div>

        {/* DAY */}
        <div className="relative w-full">
          <select
            value={day}
            onChange={(e) => {
              setDay(Number(e.target.value));
              setTouched(true);
            }}
            onFocus={() => setFocusDay(true)}
            onBlur={() => setFocusDay(false)}
            className={boxClass}
          >
            {daysList.map((d) => (
              <option
                key={d}
                value={d}
                disabled={
                  year === maxYear &&
                  month === maxMonth &&
                  d > maxDay
                }
              >
                {d}
              </option>
            ))}
          </select>
          <label style={labelStyle(floatDay)}>{t("day")}</label>
        </div>

      </div>

      {touched && error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
