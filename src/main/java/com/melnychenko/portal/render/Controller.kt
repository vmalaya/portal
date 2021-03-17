package com.melnychenko.portal.render

import com.oracle.truffle.js.scriptengine.GraalJSScriptEngine
import org.graalvm.polyglot.Context
import org.graalvm.polyglot.HostAccess
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import javax.servlet.http.HttpServletRequest

@Controller
class HtmlController {
  val indexHtml by lazy {
    HtmlController::class.java.getResource("/templates/index.html").readText()
  }
  private val initJs by lazy(::readInitJs)
  private val renderJs by lazy(::readRenderJs)
  private val engine by lazy(::initializeEngine)

  private fun initializeEngine(): GraalJSScriptEngine {
    val engine = GraalJSScriptEngine.create(null,
      Context.newBuilder("js")
          .allowHostAccess(HostAccess.ALL)
          .allowHostClassLookup({ s -> true }))

    engine.eval("window = { location: { hostname: 'localhost' } }")
    engine.eval("navigator = {}")
    engine.eval(initJs)
    engine.eval("window.isServer = true")

    return engine
  }

  private fun readInitJs(): String {
    val startIndex = indexHtml.indexOf("<script>")+"<script>".length
    val endIndex = indexHtml.indexOf("</script>", startIndex)

    return indexHtml.substring(startIndex, endIndex)
  }

  private fun readRenderJs(): String {
    val startIndex = indexHtml.indexOf("<script defer=\"defer\" type=\"module\">")+"<script defer=\"defer\" type=\"module\">".length
    val endIndex = indexHtml.indexOf("</script>", startIndex)

    return indexHtml.substring(startIndex, endIndex)
  }

  @GetMapping("/")
  @ResponseBody
  fun blog(request: HttpServletRequest): String {
    println(request.requestURI)
    engine.eval("window.requestUrl = '"+request.requestURI+"'")
    val html = engine.eval(renderJs)
    return indexHtml.replace("<div id=\"app\"></div>", "<div id=\"app\">$html</div>")
  }

}