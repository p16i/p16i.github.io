#!/usr/bin/env ruby

def main()
    print <<EOF
Hey Dude!!!
Would you like some post from me?
=================
EOF

    local_path = Dir.getwd


    date = (Time.new).strftime("%F")
    format = ask_extension();
    title = ask_title();


    filename = "#{date}-#{title}.#{format}"
    if recv_input("Would you like to create \"#{filename}\"? (y,n): ")[0].eql? "y"
        actual_path = "#{local_path}/_posts/#{filename}"
        File.new( actual_path, "w");
        puts "Now, you get it :D"
        puts "at \"#{actual_path}\""
    else
        puts "I just do nothing :("
    end
    #
    #
    #
end


def ask_extension()
    default = "md"
    question ="Extension (#{default}): "
    input = recv_input(question);
    ext = ( input[0] ) ? input : default
    return ext
end

def ask_title()
    default = "new-post"
    question ="What is `title`? (#{default}): "
    input = recv_input(question);
    ext = ( input[0] ) ? input : default
    return ext
end

def recv_input(question)
    print "#{question}"
    STDOUT.flush
    return gets.chomp
end

main();
