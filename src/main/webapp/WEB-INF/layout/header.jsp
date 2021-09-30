<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" language="java"%>
<%@ page trimDirectiveWhitespaces="true" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
    <div class="container">
        <a class="navbar-brand disabled" href="#">EBM-Java-UI</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link ${fn:endsWith(pageContext.request.requestURI, '/upload.jsp') ? "active" : ""}"
                    href="${pageContext.request.contextPath}/upload">
                        <spring:message code="words.Upload"/>
                    </a>
                </li>
                <c:if test="${not empty sessionScope.overviewSessionData}">
                    <a class="nav-link ${fn:endsWith(pageContext.request.requestURI, '/overview.jsp') ? "active" : ""}"
                    href="${pageContext.request.contextPath}/overview">
                        <spring:message code="words.Overview"/>
                    </a>
                </c:if>
            </ul>
        </div>
    </div>
</nav>

<div class="row">
    <spring:message code="words.Close" var="wordsClose"/>
    <div id="notification-section" class="col-sm-12">
        <noscript>
            <div class="alert alert-danger" role="alert"><strong><spring:message code="words.Information"/>: </strong>Javascript
            <%-- A Javascript driven close button is useless here --%>
            <spring:message code="info.NoScript"/>
        </div>
        </noscript>
        <%-- Display info texts --%>
        <c:forEach items="${info}" var="info">
            <div class="alert alert-info alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="${wordsClose}"><span aria-hidden="true">&times;</span></button>
                <strong><spring:message code="words.Information"/>: </strong>${info}
            </div>
        </c:forEach>
        <%-- Display error texts --%>
        <c:forEach items="${errors}" var="error">
            <div class="alert alert-danger alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="${wordsClose}"><span aria-hidden="true">&times;</span></button>
                <strong><spring:message code="words.Error"/>: </strong>${error}
            </div>
        </c:forEach>

        <%-- Info notification template for JS --%>
        <div id="info-notification-template" class="d-none alert alert-info alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="${wordsClose}"><span aria-hidden="true">&times;</span></button>
            <strong><spring:message code="words.Information"/>: </strong>
        </div>
        <%-- Error notification template for JS --%>
        <div id="error-notification-template" class="d-none alert alert-danger alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="${wordsClose}"><span
                    aria-hidden="true">&times;</span></button>
            <strong><spring:message code="words.Error"/>: </strong>
        </div>
    </div>
</div>