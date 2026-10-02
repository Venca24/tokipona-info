ENV['RACK_ENV'] ||= 'development'

require 'html-proofer'

desc "Validates all genrated HTML files"
task :test_html do
  HTMLProofer.check_directory(
    './_site',
    {
      disable_external: true,
      allow_hash_href: true,
      enforce_https: false
    }
  ).run
end
