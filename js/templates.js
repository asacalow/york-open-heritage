this["JST"] = this["JST"] || {};

this["JST"]["hbs/lsoa-info.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"marker-info\">\n  <h4>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n  <ul>\n    <li>Ranked <strong>";
  if (helper = helpers.rank) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rank); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</strong> of <strong>118</strong> locally (where 118 is the least deprived).</li>\n    <li>Ranked <strong>";
  if (helper = helpers.globalRank) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.globalRank); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</strong> of <strong>32482</strong> in the UK (where 32482 is the least deprived).</li>\n    <li>The median house price in this area is <strong>&pound;";
  if (helper = helpers.averageSale) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.averageSale); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</strong>.</li>\n  </ul>\n</div>\n";
  return buffer;
  });

this["JST"]["hbs/listed-building.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"marker-info\">\n  <h4>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n  <p>Grade ";
  if (helper = helpers.grade) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.grade); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " listed, on ";
  if (helper = helpers.listedOn) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.listedOn); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ". View on <a href=\"http://list.english-heritage.org.uk/resultsingle.aspx?uid=";
  if (helper = helpers.entryNo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.entryNo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"eh\">english-heritage.org.uk</a>.</p>\n</div>\n";
  return buffer;
  });

this["JST"]["hbs/intro.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h3>Welcome to the York Open Heritage Explorer</h3>\n<p>This data visualisation brings together three datasets - house prices from the UK land registry; combined deprivation (economic, health etc.) ranks from the UK Office for National Statistics (ONS) \"Indices of multiple deprivation\" (IMD); English Heritage data for Grade I and II listed buildings - together on one map.</p>\n\n<h4>How to use the explorer</h4>\n<p>Listed buildings are displayed as clustered geomarkers, house prices and IMD ranks have been grouped into quintiles and coloured accordingly. Click on a geographical area or geomarker for more information, or click on a geomarker cluster to zoom into that cluster. You can switch between the datasets being visualised using the toggle in the top-right corner.</p>\n\n<h4>Data Overview</h4>\n<p>The geographical areas represented are <a href=\"http://www.ons.gov.uk/ons/guide-method/geography/beginner-s-guide/census/super-output-areas--soas-/index.html\">LSOAs</a>. The ONS uses LSOAs for statistic gathering purposes, each chosen to contain roughly the same number of residents. IMD ranks were recalculated locally, based on the UK-wide IMD ranks, <a href=\"https://github.com/asacalow/york-open-heritage/blob/master/WORKINGS.md\">see here for why</a>. House price data was calculated by matching house sales since August 2012 (~8k sales) with its LSOA on postcode, and the median sale price for each LSOA used. Quintiles were then generated so that each map colour represents a roughly equal number of LSOAs.</p>\n<p>There is a more detailed overview and explanation of the data used and the workings which generated this visualisation <a href=\"https://github.com/asacalow/york-open-heritage/blob/master/WORKINGS.md\">here</a>.</p>\n<p>This work was conducted as part of the AHRC funded project <em>\"How should decisions about heritage be made\"</em>. All code and workings are <a href=\"https://github.com/asacalow/york-open-heritage\">released</a> under a permissive, open-source BSD licence - reuse/repurpose at will.</p>\n";
  });