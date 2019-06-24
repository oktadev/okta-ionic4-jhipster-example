# Build Mobile Apps with Ionic 4 and JHipster 6

This example shows how to create an Ionic 4 application that talks to a JHipster 6 backend.

Please read [Build Mobile Apps with Angular, Ionic 4, and Spring Boot](https://developer.okta.com/blog/2019/06/24/ionic-4-angular-spring-boot-jhipster) to see how this example was created.

**Prerequisites:** Java 8+ and [Node.js](https://nodejs.org/) 10+.

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-ionic4-jhipster-example.git ionic4-jhipster
cd ionic4-jhipster
```

This will get a copy of the project installed locally. 

### Create an OIDC App on Okta

To begin, sign up for a https://developer.okta.com/signup/[forever-free Okta developer account].

Once you're signed in to Okta, register your JHipster application.

* In the top menu, click on **Applications**
* Click on **Add Application**
* Select **Web** and click **Next**
* Enter `JHipster FTW!` for the **Name** (this value doesn't matter, so feel free to change it)
* Change the Login redirect URI to be `http://localhost:8080/login/oauth2/code/oidc`
* Click **Done**, then **Edit** and add `http://localhost:8080` as a Logout redirect URI
* Click **Save**

### Add a Groups Claim to the ID Token

In order to login to your JHipster app, you'll need to adjust your Okta authorization server to include a `groups` claim.

On Okta, navigate to **Users** > **Groups**. Create `ROLE_ADMIN` and `ROLE_USER` groups and add your account to them.

Navigate to **API** > **Authorization Servers**, click the **Authorization Servers** tab and edit the **default** one. Click the **Claims** tab and **Add Claim**. Name it "groups" or "roles" and include it in the ID Token. Set the value type to "Groups" and set the filter to be a Regex of `.*`. Click **Create**.

### Run the JHipster API

Open a terminal, navigate to the `app` directory and run the following command:

```
SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI=https://{yourOktaDomain}/oauth2/default \
  SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID=$clientId \
  SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET=$clientSecret ./gradlew
```

### Add a Native App for Ionic

You'll also need to create a Native app for Ionic. 

* In the Okta developer console, click on **Applications**
* Click on **Add Application**
* Select **Native** and click **Next**
* Enter `Ionic FTW!` for the Name
* Add Login redirect URIs: `http://localhost:8100/implicit/callback` and `dev.localhost.ionic:/callback`
* Click **Done**, then **Edit** and add Logout redirect URIs: `http://localhost:8100/implicit/logout` and `dev.localhost.ionic:/logout`
* Click **Save**

After performing these steps, copy your `clientId` into [`src/app/auth/auth.service.ts`](https://github.com/oktadeveloper/okta-ionic4-jhipster-example/blob/master/mobile/src/app/auth/auth.service.ts#L59).

```typescript
this.requestor.xhr({method: 'GET', url: AUTH_CONFIG_URI}).then(async (data: any) => {
  this.authConfig = {
    identity_client: '{yourClientId}',
    identity_server: data.issuer,
    redirect_url: redirectUri,
    end_session_redirect_url: logoutRedirectUri,
    scopes,
    usePkce: true
  };
  await this.storage.setItem(AUTH_CONFIG_URI, JSON.stringify(this.authConfig));
}
```

Now you should be able to open another terminal window, navigate to the `mobile` directory, and run the Ionic app.

```
ionic serve
```

## Links

This example uses the following libraries provided by Okta:

* [Ionic for JHipster](https://github.com/oktadeveloper/generator-jhipster-ionic#readme)

## Help

Please post any questions on the [associated blog post](https://developer.okta.com/blog/2019/06/24/ionic-4-angular-spring-boot-jhipster) or on the [Okta Developer Forums](https://devforum.okta.com/). 

## License

Apache 2.0, see [LICENSE](LICENSE).