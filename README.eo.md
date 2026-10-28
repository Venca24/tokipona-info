# tokipona.info en Jekyll

## Pri la projekto

Tiu ĉi projekto estas reimplementigo de la retejo tokipona.info kiel statika retejo generita de Jekyll.

Ĝia ĉefa celo estas prezenti la enhavon de la libro _toki pona en 76 ilustritaj lecionoj_ (publikigita en 2013 de la eldonejo Espero) en cifereca formo kun iom da aldona enhavo.

## Kiel komenci

1. Elŝutu la fontokodon

        $ git clone --recurse-submodules git@github.com:Venca24/tokipona-info.git

2. Instalu la dependaĵojn

        $ bundle install

3. Startigu la retejon en localhost

        $ bundle exec jekyll serve

4. Iru al `http://localhost:4000` en via retumilo.

### Disponigi en OCI-kontenero

1. Elŝutu la fontokodon

        $ git clone git@github.com:Venca24/tokipona-info.git

2. Kreu la konteneron

        $ docker build -t tokipona .

3. Startigu la konteneron

        $ podman run --rm -p 8000:8000 tokipona

4. Iru al `http://localhost:8000` en via retumilo.

## Permesilo

La enhavo de la retejo, inkluzive de la lecionoj kaj la desegnaĵoj, estas sub la kondiĉoj de [Krea Komunaĵo Atribuite 3.0 Neadaptita](https://creativecommons.org/licenses/by/3.0/deed.eo).

La kodo kaj ajna ero de la origina programaro, kiu estas parto de tiu ĉi deponejo, estas eldonita sub permesilo MIT (Expat). La retejo uzas [Chirpy Jekyll Theme](https://github.com/cotes2020/jekyll-theme-chirpy/) de Cotes Chung sub la sama permesilo.
