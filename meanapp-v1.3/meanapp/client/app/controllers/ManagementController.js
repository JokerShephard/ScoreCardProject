'use strict';

MainApp.controller('ManagementController', ['$scope', '$rootScope','$http', function($scope,$rootScope, $http) {


  Date.prototype.getMonthName = function() {
      var monthNames = [ "January", "February", "March", "April", "May", "June",
                         "July", "August", "September", "October", "November", "December" ];
      return monthNames[this.getMonth()];
  }
            $scope.SubmitAudit = function() {

              $scope.ReadyAudit.AuditDate = new Date($scope.ReadyAudit.AuditDate);
              $scope.ReadyAudit.Year = $scope.ReadyAudit.AuditDate.getFullYear();
              $scope.ReadyAudit.Month = $scope.ReadyAudit.AuditDate.getMonthName();

                var totalscore = 0;

                for (var i = 0; i < $scope.ReadyAudit.Questionarray.length; i++) {
                    totalscore += parseInt($scope.ReadyAudit.Questionarray[i].Score);

                }
                $scope.ReadyAudit.Score = totalscore;

                $scope.ReadyAudit.Status = "Publish";
                  $scope.ReadyAudit.Auditor = $rootScope.activeUser.user.Name;
                    $scope.ReadyAudit.Department = $rootScope.activeUser.user.Department;

                console.log("Audit is " + JSON.stringify($scope.ReadyAudit));
                $http.post('/audit', $scope.ReadyAudit).success(function(response) {
                    console.log(response);

                    console.log("Audit email is " + JSON.stringify($scope.ReadyAudit));

                });

                $http.get('/user', {
                    params: {
                        Name: $scope.ReadyAudit.UserId
                    }

                }).success(function(response) {

                    $scope.currentUserUnderAudit = [];
                    $scope.currentUserUnderAudit.push(response);
                    $scope.currentUserUnderAudit.push($scope.ReadyAudit);


                    console.log("sent email to " + $scope.currentUserUnderAudit[0].Email);
                    $http.post('/mail/', $scope.currentUserUnderAudit).success(function(response) {
                        console.log(response);
                    });

                });

            }

            var refreshquestionnaire = function() {
                $http.get('/questionnaire').success(function(response) {
                    console.log("I got the quesntionnaires I requested " + JSON.stringify(response));
                    $scope.questionnairelist = response;

                });
            };
            var refreshDraftquestionnaire = function() {
              $http.get('/questionnaire?Status=Draft').success(function(response) {
                    console.log("I got the Draft quesntionnaires I requested " + JSON.stringify(response));
                    $scope.draftquestionnairelist = response;

                });
            };
            refreshDraftquestionnaire();
            refreshquestionnaire();
            //===============================================================================
            $scope.ReadyQuestionnaire = [];
            $scope.objects = [];
            $scope.choices = [];
              $scope.Draftchoices = [];
            $scope.obj = []
            $scope.ReadyAudit = {};


            $scope.assigndraftQuestionnaire = function(indx) {
                refreshDraftquestionnaire();
                console.log('inside of assign draft '+ indx + JSON.stringify($scope.draftquestionnairelist[indx]));
                $scope.currentDraftQuestionnaire =$scope.draftquestionnairelist[indx];
  $scope.Draftchoices = $scope.currentDraftQuestionnaire.Questionarray;
            }

            $scope.assignQuestionnaire = function(indx) {
                console.log('inside of assign normal' + JSON.stringify($scope.questionnairelist[indx]));
                $scope.currentQuestionnaire = $scope.questionnairelist[indx];
                $scope.ReadyAudit.Questionarray = $scope.currentQuestionnaire.Questionarray;

                $scope.ReadyAudit.Auditor = $scope.currentQuestionnaire.Auditor;
                $scope.ReadyAudit.Department = $scope.currentQuestionnaire.Department;
                console.log('inside of ReadyAudit ' + JSON.stringify($scope.ReadyAudit));
            }

            $scope.onChange = function(s, index) {
                console.log('adding question');
                console.log(s);
                $scope.ReadyQuestionnaire.splice(index, 0, s);
                console.log('this is the ready questionnaire ' + $scope.ReadyQuestionnaire[index]);
                $scope.obj[index] = JSON.parse($scope.ReadyQuestionnaire[index]);
                $scope.objects[index] = JSON.parse($scope.ReadyQuestionnaire[index]);


            };
$scope.arrScore = [];

            $scope.onChangeScore = function(score, index) {
              var totals = 0;
                console.log('Score ' + score);
                $scope.obj[index] = JSON.parse($scope.ReadyQuestionnaire[index]);
                $scope.obj[index].MaxScore = score;
                console.log('this is the ready questionnaire on Score' + JSON.stringify($scope.obj[index]));


$scope.arrScore[index] =  $scope.obj[index].MaxScore;

            for (var i = 0; i < $scope.arrScore.length; i++) {
            totals += parseInt($scope.arrScore[i]);

            }
              $scope.myCurrent = totals;

            };


            $scope.addNewChoice = function() {

                var newItemNo = $scope.choices.length + 1;
                $scope.choices.push({
                    'id': ''
                });


            };

            $scope.Publish = function() {

                $scope.Questionnaire.Questionarray = $scope.obj;
                console.log($scope.Questionnaire);
                $scope.Questionnaire.Status = 'Published';
                $scope.Questionnaire.Auditor = $rootScope.activeUser.user.Name;

                $http.post('/questionnaire', $scope.Questionnaire).success(function(response) {

                    console.log(response);
                    refreshquestionnaire();

                });

            };

            $scope.onChangeEngineer = function(wantedengineer) {

                console.log('Function to add engineer');


                var user = JSON.parse(wantedengineer);
                $scope.ReadyAudit.UserId = user.Name;

                console.log('inside of ReadyAudit when changing engineer ' + JSON.stringify($scope.ReadyAudit));
            };

            $scope.removeChoice = function(index) {
              var totals = 0;

                $scope.choices.splice(index, 1);
                $scope.ReadyQuestionnaire.splice(index, 1);

$scope.arrScore[index] = 0;
                for (var i = 0; i < $scope.arrScore.length; i++) {
                totals += parseInt($scope.arrScore[i]);

                }
                  $scope.myCurrent = totals;


            };

            //===============================================================================
            var refresh = function() {
                $http.get('/question').success(function(response) {
                    console.log("I got the data I requested");
                    $scope.questionlist = response;
                    $scope.newQuestion = "";
                });
            };

            $scope.editQuestionnaire = function(id) {
                console.log(id);
                $http.get('/questionnaire/' + id).success(function(response) {
                    $scope.questionnairetoedit = response;
                });
            };

            $scope.removequestionnaire = function(id) {
                console.log(id);
                $http.delete('/questionnaire/' + id).success(function(response) {
                    refresh();
                });
            };

            $scope.removeQuestion = function(question) {
                $http.delete('/question/' + question._id).success(function(response) {});
            };


            $scope.addQuestion = function() {
                console.log('adding question');
                console.log('here is the new question ' + $scope.newQuestion);
                $http.post('/question', $scope.newQuestion).success(function(response) {
                    console.log(response);
                    refresh();
                });
            };

            $scope.removeAll = function() {
                $scope.questionlist = [];
            };

            $http.get('/question').success(function(data) {
                console.log("I got the data I requested");
                $scope.questionlist = data;
                //$scope.question = "";

            });
            $http.get('/user').success(function(data) {
                console.log("I got the data I requested");

                $scope.engineerslist = data;
                //$scope.question = "";

            });
        }]).directive("progressbar", function () {
            return {
                restrict: "A",
                scope: {
                    total: "=",
                    current: "="
                },
                link: function (scope, element) {

                    scope.$watch("current", function (value) {
                        element.css("width", scope.current / scope.total * 100 + "%");
                    });
                    scope.$watch("total", function (value) {
                        element.css("width", scope.current / scope.total * 100 + "%");
                    })
                }
            };
        });
