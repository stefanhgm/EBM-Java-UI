<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" language="java" %>
<%@ page trimDirectiveWhitespaces="true" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<tiles:insertDefinition name="basic" flush="true">
    <tiles:putAttribute name="page-title">
        <spring:message code="pageTitles.Validate"/>
    </tiles:putAttribute>
    <tiles:putAttribute name="content" cascade="true">

        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="card h-100" style="height: 90vh!important;">
                        <div class="card-header">
                            <h5 class="card-title m-0 float-left">
                                <spring:message code="words.ModelOverview"/>
                            </h5>
                        </div>
                        <div class="card-body" style="overflow:scroll">
                            <p class="overviewSection"><spring:message code="words.intercept"/>:<div id="intercept"></div></p>
                            <p class="overviewSection">
                                <spring:message code="words.byRelevance"/>:
                            </p>

                            <div id="modelOverview">

                            </div>

                            <form:form modelAttribute="componentSelectionDto" method="post" id="riskFunctionSelectionForm"
                                       action="${pageContext.request.contextPath}/validate?identifier=${pageContext.request.getParameter('identifier')}">
                                <c:forEach items="${componentSelectionDto.componentSelections}" var="componentSelection" varStatus="componentIterator">
                                    <div style="display: none;">
                                        <form:input path="componentSelections[${componentIterator.index}].index"/>
                                        <form:checkbox id="selection-index-${componentSelection.index}" path="componentSelections[${componentIterator.index}].selected"/>
                                    </div>
                                </c:forEach>

                                <fieldset>
                                    <spring:message code="words.Cancel" var="wordsCancel"/>
                                    <button type="submit" class="btn btn-danger float-left" title="${wordsCancel}" name="cancel" onclick="return confirm('${wordsCancel}?')">
                                            ${wordsCancel}
                                    </button>

                                    <spring:message code="words.Validate" var="wordsValidate"/>
                                    <button type="submit" class="btn btn-success float-right" title="${wordsValidate}" name="validate" onclick="return confirm('${wordsValidate}?')">
                                            ${wordsValidate}
                                    </button>
                                </fieldset>
                            </form:form>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card h-100" style="height: 90vh!important;">
                        <div class="card-header">
                            <h5 class="card-title m-0 float-left">
                                <spring:message code="words.RiskFunction"/>
                            </h5>
                        </div>
                        <div class="card-body" style="overflow: scroll">
                            <div id="plots" selected="0">

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="textlength"></div>
        <div id="include">
            <spring:message code="words.include"/>
        </div>
        <div id="exclude">
            <spring:message code="words.exclude"/>
        </div>

    </tiles:putAttribute>
</tiles:insertDefinition>
