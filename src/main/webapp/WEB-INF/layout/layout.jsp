<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" language="java"%>
<%@ page trimDirectiveWhitespaces="true" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="tilesx" uri="http://tiles.apache.org/tags-tiles-extras" %>

<!DOCTYPE html>
<html lang="${locale}">
    <head>
        <meta charset="UTF-8"><%-- Not neccessary, but for neatness --%>

        <c:set var="pagetitle">
            <tiles:getAsString name="page-title"/>
        </c:set>
        <c:set var="fullPagetitle">
            <c:if test="${not empty pagetitle}">${pagetitle} - </c:if><spring:message code="words.EBMJavaUITitle"/>
        </c:set>

        <script>
            <%-- Returns context Path for JavaScript Applications --%>
            function getContextPath() {
                return "${pageContext.request.contextPath}";
            }
        </script>

        <script src="${pageContext.request.contextPath}/static/jquery/jquery.min.js"></script>
        <script src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <link href="${pageContext.request.contextPath}/static/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <script src="${pageContext.request.contextPath}/static/d3js/d3.min.js"></script>

        <tilesx:useAttribute id="csslist" name="css" classname="java.util.List"/>
        <c:forEach var="cssfile" items="${csslist}">
            <link href="<spring:url value="${cssfile}"/>" rel="stylesheet">
        </c:forEach>
        <tilesx:useAttribute id="jslist" name="js" classname="java.util.List"/>
        <c:forEach var="jsfile" items="${jslist}">
            <script type="text/javascript" src="<spring:url value="${jsfile}"/>"></script>
        </c:forEach>

        <c:set var="pagetitle"><tiles:getAsString name="page-title"/></c:set>
            <title>
            <c:if test="${error}">
                <spring:message code="words.Error" /> - 
            </c:if>
            ${fullPagetitle}
        </title>
    </head>
    <body>
        <header id="header">
            <tiles:insertAttribute name="header"/>
        </header>
        <div class="container">
            <div class="row">
                <div class="col-12"
                    <tiles:insertAttribute name="content" />
                </div>
            </div>
        </div>
        <footer id="footer">
            <tiles:insertAttribute name="footer"/>
        </footer>
    </body>
</html>