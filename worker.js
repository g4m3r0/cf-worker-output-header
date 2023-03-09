addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const headers = request.headers
    const responseHeaders = new Headers()
    let output = ''
  
    // Check if the URL contains the "json" parameter
    const url = new URL(request.url)
    const isJsonRequested = url.searchParams.get('json') === '1'
  
    // Loop through the headers and append them to the responseHeaders object
    for (const [name, value] of headers.entries()) {
      responseHeaders.append(name, value)
  
      // Build the output string as key-value pairs
      output += `${name}: ${value}\n`
    }
  
    // If the "json" parameter is requested, return the headers as a JSON object
    if (isJsonRequested) {
      const headersJson = Object.fromEntries(headers.entries())
      output = JSON.stringify(headersJson)
      responseHeaders.set('content-type', 'application/json')
    }
  
    return new Response(output, {
      headers: responseHeaders,
      status: 200
    })
  }  