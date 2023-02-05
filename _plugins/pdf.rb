require 'pandoc-ruby'
require 'pathname'

module PDF
  Jekyll::Hooks.register :site, :post_render do |site|
    site.pages.each do |page|
      if page.data&.fetch("pdf", false)
        site.pages << PDFFile.new(site, page)
      end
    end
  end

  class PDFFile < Jekyll::Page
    def initialize(site, page)
      @site = site # the current site instance.
      @base = site.source # path to the source directory.    
      @dir = File.dirname(page.url) # the directory the page will reside in.
      @basename = File.basename(page.url, File.extname(page.url)) # filename without the extension.
      @ext = '.pdf' # the extension.
      @name = @basename + @ext
      @data = {}

      converter = PandocRuby.new(page.output, from: :html, to: :pdf, pdf_engine: "wkhtmltopdf")
      @output = converter.convert
    end
  end
end