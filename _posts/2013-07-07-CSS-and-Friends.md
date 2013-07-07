---

layout: post
title: CSS and Friends

---



ในหมู่ นักทำเว็บ คงรู้จัก CSS กันเป็นอย่างดี แต่บางคนอาจจะไม่รู้ว่าตัวมันนั้นมีเพื่อนด้วย ห้าๆ


เพื่อนของมันในที่นี้ก็คือ Precompiled CSS ที่ได้รับความนิยมก็เช่น LESS, SASS และ SCSS ซึ่งเจ้าตัว Precompiled CSS แบบนี้
ได้เพิ่มคุณสมบัติต่างๆ เข้าไปทำให้การเขียน CSS นั้นง่ายขึึ้น

ในที่นี้เราจะอ้างอิงตัว Syntax ของ SCSS เป็นหลักน่ะครับ

เราไล่ดู แต่ละคุณสมบัติกัน แล้วลองเปรียบเทียบดู ว่ามันง่ายขึ้นไหม ?

### Variable
เอาไว้ใช้ เวลาต้องการใช้ค่าเดิมๆ ซ้ำๆ กัน เช่น สี bg เป็นต้น

{% highlight css %}
/* CSS */
.content-navigation {
  border-color: #3bbfce;
  color: #2b9eab;
}

.border {
  padding: 8px;
  margin: 8px;
  border-color: #3bbfce;
}

/* SCSS */
$blue: #3bbfce;
$margin: 16px;

.content-navigation {
  border-color: $blue;
  color:
    darken($blue, 9%);
}

.border {
  padding: $margin / 2;
  margin: $margin / 2;
  border-color: $blue;
}
{% endhighlight %}

### Mixins
คล้ายๆ กับเรียก function ในโปรแกรมเพื่อสร้างสไตล์ แบบที่เราต้องการ

{% highlight css %}
/* CSS */
#data {
  float: left;
  margin-left: 10px;
}
#data th {
  text-align: center;
  font-weight: bold;
}
#data td, #data th {
  padding: 2px;
}

/* SCSS */
@mixin table-base {
  th {
    text-align: center;
    font-weight: bold;
  }
  td, th {padding: 2px}
}

@mixin left($dist) {
  float: left;
  margin-left: $dist;
}

#data {
  @include left(10px);
  @include table-base;
}
{% endhighlight %}

### Selector Inheritance
เราสามารถ แชร์สไตล์ต่างๆ ให้ selector ตัวอื่นๆ ได้

{% highlight css %}
/* CSS */
.error, .badError {
  border: 1px #f00;
  background: #fdd;
}

.error.intrusion,
.badError.intrusion {
  font-size: 1.3em;
  font-weight: bold;
}

.badError {
  border-width: 3px;
}

/* SCSS */
.error {
  border: 1px #f00;
  background: #fdd;
}
.error.intrusion {
  font-size: 1.3em;
  font-weight: bold;
}

.badError {
  @extend .error;
  border-width: 3px;
}
{% endhighlight %}

หลังจากที่ดูตัวอย่างกันมาแล้ว ก็อย่าลืมลองเอาไปใช้กันดูน่ะครับผม ชีวิตเราจะได้สบายขึ้น :D

**REF :**

http://sass-lang.com/ 

