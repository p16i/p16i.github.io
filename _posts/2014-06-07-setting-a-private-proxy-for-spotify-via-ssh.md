---
layout: post
title: Setting a private proxy for Spotify via SSH
description:  using SSH as a proxy
category: articles
tags: [ ssh, spotify, proxy]
comments: true
image:
  credit: Spotify.com
  creditlink: http://spotify.com
  feature: spotify.png
---

 I currently live in Thailand, the land that **Spotify** isn't available.  I've tried its alternatives, Deezer, Rdio, their services are still far from Spotify. Offering well design native application is the most thing that I make me love Spotify, if you're on OSX, you can use media keys to control the app. That's the reason! So what have I done in order to get it?

1. Setting Server in country that Spotify is available.

	I need a server that I'll use it as proxy in order to bypass my Spotify request to its service, instead of sending requests directly. At the moment, I'm using DigitalOcean that offer me 	reasonable price( **5$ / month** ). And only setting that I did on the server is laying my public key on it, so I can ssh to the server without password prompt.

	```
	ssh root@<server_ip> "echo `cat ~/.ssh/id_rsa.pub` >> ~/.ssh/authorized_keys"
	```

2. Setup a sock proxy on my machine.

    I use **ssh** to create a **SOCK** proxy for me

    ```
    ssh -NCD 127.0.0.1:8090 root@<server_ip>
    ```

    Now I have a private proxy running then we set Spotify application to use that proxy by going to proxy section in setting page.

    ![image](/article-asset/2014-06/spotify-proxy.png)

    After restarting the application, a ton of songs will be served right away. And in this case, I have to run it every time I start my machine. Fortunately, I'm on OSX which has **AppleScript(.scpt)** that can run shell command and
    be exported as an OSX application.


    Here the content in **my-private-proxy.scpt**
    ```
    do shell script "ssh -NCD 0:8090 root@<server_ip> -v > $HOME/.private-proxy.log 2>&1"
    ```


    And export it as a application then add it to login item ( **System Preference > Users > Login Items** )

    ![image](/article-asset/2014-06/export-as-app.png)
    ![image](/article-asset/2014-06/add-login-item.png)

    DONE! \o/
