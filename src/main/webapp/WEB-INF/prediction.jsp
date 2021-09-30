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
        <spring:message code="pageTitles.Prediction"/>
    </tiles:putAttribute>
    <tiles:putAttribute name="content" cascade="true">

        <div class="container">
            <div class="row" style="justify-content: center">
                <div class="col-md-9">
                    <div class="card h-100" style="">
                        <div class="card-header">
                            <h5 class="card-title m-0 float-left">
                                <spring:message code="words.influence"/>
                            </h5>
                        </div>
                        <div class="card-body" style="overflow:scroll">
                            <div class="d-flex">
                                <spring:message code="words.Prediction"/>:
                                <p id="risk"> </p>
                            </div>

                            <div id="modelOverviewPrediction">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
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

    </tiles:putAttribute>
</tiles:insertDefinition>

