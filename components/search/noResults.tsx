import { useInstantSearch } from 'react-instantsearch';

export default function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <div>
      <p>
        На запит <q>{indexUiState.query}</q> нічого не знайдено.
      </p>
    </div>
  );
}
