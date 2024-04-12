import "./style.scss";

interface BodyHeaderProps {
  navigation: { link: string; title: string }[];
}

export default function BodyHeader(props: BodyHeaderProps) {
  const { navigation } = props;

  return (
    <div className="body-header">
      <div className="d-flex justify-content-between">
        {navigation && (
          <ul className="nav nav-tabs d-flex">
            {navigation.map((nav, i) => {
              return (
                <li className="nav-item" key={nav.title}>
                  <button
                    className={`nav-link ${!i && "active"}`}
                    data-bs-target={nav.link}
                    data-bs-toggle="tab"
                    type="button"
                    role="tab"
                    id={nav.title}
                  >
                    {nav.title}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
