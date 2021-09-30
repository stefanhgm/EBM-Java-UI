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
        <spring:message code="pageTitles.Model"/>
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
