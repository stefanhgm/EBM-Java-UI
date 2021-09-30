<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" language="java" %>
<%@ page trimDirectiveWhitespaces="true" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<tiles:insertDefinition name="basic" flush="true">
    <tiles:putAttribute name="page-title">
        <spring:message code="pageTitles.Overview"/>
    </tiles:putAttribute>
    <tiles:putAttribute name="content" cascade="true">

        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="card h-100" style="height: 90vh!important;">
                        <div class="card-header">
                            <h5 class="card-title m-0 float-left">
                                <spring:message code="words.Information"/>
                            </h5>
                        </div>
                        <div class="card-body" style="overflow:scroll">
                            <p>
                                EBM-Java-UI is a simple Java Web-Application to inspect EBM models and select a set of risk functions. It also supports prediction via an API for validated models.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card h-100">
                        <div class="card-header">
                            <h5 class="card-title m-0 float-left">
                                <spring:message code="words.PredictionModels"/>
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="col-xs-6">
                                <h5 class="sub-header"><spring:message code="words.ValidatedModels"/></h5>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th class="col-md-1">Id</th>
                                                <th class="col-md-3">Comment</th>
                                                <th class="col-md-1"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <c:forEach items="${predictionModels}" var="predictionModel" varStatus="modelIndex">
                                                <c:if test="${predictionModel.validated}">
                                                    <tr>
                                                        <td class="col-md-1">${predictionModel.id}</td>
                                                        <td class="col-md-3">${predictionModel.modelComment}</td>
                                                        <td class="col-md-1">
                                                            <a href="${pageContext.request.contextPath}/model?identifier=${predictionModel.modelIdentifier}">
                                                                <spring:message code="words.View"/>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </c:if>
                                            </c:forEach>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br/>
                            <div class="col-xs-6">
                                <h5 class="sub-header"><spring:message code="words.NonValidatedModels"/></h5>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th class="col-md-1">Id</th>
                                                <th class="col-md-3">Comment</th>
                                                <th class="col-md-1"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <c:forEach items="${predictionModels}" var="predictionModel" varStatus="modelIndex">
                                                <c:if test="${!predictionModel.validated}">
                                                    <tr>
                                                        <td class="col-md-1">${predictionModel.id}</td>
                                                        <td class="col-md-3">${predictionModel.modelComment}</td>
                                                        <td class="col-md-1">
                                                            <a href="${pageContext.request.contextPath}/validate?identifier=${predictionModel.modelIdentifier}">
                                                                <spring:message code="words.Validate"/>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </c:if>
                                            </c:forEach>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </tiles:putAttribute>
</tiles:insertDefinition>
