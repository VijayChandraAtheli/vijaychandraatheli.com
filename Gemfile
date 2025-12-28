source "https://rubygems.org"

# Jekyll
gem "jekyll", "~> 4.3.0"

# Required for Ruby 3.0+
gem "webrick", "~> 1.8"

# Jekyll Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
end

# Windows and JRuby
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]