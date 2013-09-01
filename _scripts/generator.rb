#!/usr/bin/env ruby

print <<EOF
Hey Dude!!!
Would you like some post from me?
=================
EOF

local_path = Dir.getwd

format = 'md'
date = (Time.new).strftime("%F")
title = 'Hello-world';

filename = "#{local_path}/_posts/#{date}-#{title}.#{format}"
puts  filename;
File.new( filename, "w");
