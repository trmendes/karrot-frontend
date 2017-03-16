import HomeModule from "./home";

const { module } = angular.mock;

describe("Home", () => {
  beforeEach(() => {
    module(HomeModule);
  });

  let $log;
  beforeEach(inject(($injector) => {
    $log = $injector.get("$log");
    $log.reset();
  }));
  afterEach(() => {
    $log.assertEmpty();
  });

  describe("Module", () => {
    it("is named home", () => {
      expect(HomeModule).to.equal("home");
    });
  });

  describe("Controller", () => {
    let $componentController, $httpBackend, $q, Authentication;
    beforeEach(inject(($injector) => {
      $componentController = $injector.get("$componentController");
      $httpBackend = $injector.get("$httpBackend");
      $q = $injector.get("$q");

      Authentication = $injector.get("Authentication");
      Authentication.data = { id: 1 };
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    let groupData = [
      { id: 50 },
      { id: 99 }
    ];

    it("should redirect user", () => {
      $httpBackend.expectGET("/api/groups/?members=1").respond(200, groupData);
      let $ctrl = $componentController("home", {});
      sinon.stub($ctrl.$state, "go");
      $ctrl.$onInit();
      $httpBackend.flush();
      expect($ctrl.$state.go).to.have.been.calledWith("group", { groupId: 50 });
    });

    it("opens join group dialog", () => {
      $httpBackend.expectGET("/api/groups/?members=1").respond(200, {});
      let $ctrl = $componentController("home", {});
      sinon.stub($ctrl.$state, "go");
      sinon.stub($ctrl.$mdDialog, "show");
      $ctrl.$mdDialog.show.returns($q((resolve) => {
        resolve(1337);
      }));
      $ctrl.$onInit();
      $httpBackend.flush();
      expect($ctrl.$state.go).to.have.been.calledWith( "group", { groupId: 1337 } );
    });
  });

  describe("Component", () => {
    let $compile, scope;
    beforeEach(inject(($rootScope, $injector) => {
      $compile = $injector.get("$compile");
      scope = $rootScope.$new();
    }));

    it("compiles component", () => {
      $compile("<home></home>")(scope);
    });
  });
});
