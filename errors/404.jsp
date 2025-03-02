<%@page isErrorPage="true"%><%
    final String uri = pageContext.getErrorData().getRequestURI();
    if (uri.contains("/java-intro")) {
        response.sendRedirect(uri.replace("/java-intro", "/paradigms"));
    } else if (!uri.endsWith("/") && !uri.contains(".")) {
        response.sendRedirect(uri + "/");
    } else {
        %>
            <html><head>
            <meta http-equiv="content-type" content="text/html;charset=utf-8">
            <title>404 Not Found!</title>
            </head>
            <body text=#000000 bgcolor=#ffffff>
            <h1>Error: Not Found!</h1>
            <h2>The requested URL <code><%=uri%></code> was not found on this server.</h2>
            <h2></h2>
            </body></html>
        <%
    }
%>
